# Import necessary libraries
from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
from transformers import AutoModelForQuestionAnswering, AutoTokenizer
import torch
import pymongo
import re

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# MongoDB URI and database
MONGO_URI = "mongodb+srv://joanroche1604:o4HMNklN8mfozRYk@cluster0.gswdx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
MONGO_DB_NAME = "test"

# MongoDB helper functions
def connect_to_mongodb():
    client = pymongo.MongoClient(MONGO_URI)
    return client[MONGO_DB_NAME]

def insert_data(collection_name, data):
    db = connect_to_mongodb()
    collection = db[collection_name]
    return collection.insert_one(data)

def retrieve_data(collection_name, query={}):
    db = connect_to_mongodb()
    collection = db[collection_name]
    return collection.find(query)

# Load RoBERTa model and tokenizer
model_name = "deepset/roberta-base-squad2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForQuestionAnswering.from_pretrained(model_name)

# Answer user questions using RoBERTa model
def answer_question(question, context):
    inputs = tokenizer(question, context, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)

    start_scores, end_scores = outputs.start_logits, outputs.end_logits
    start_index = torch.argmax(start_scores)
    end_index = torch.argmax(end_scores) + 1

    answer = tokenizer.convert_tokens_to_string(
        tokenizer.convert_ids_to_tokens(inputs["input_ids"][0][start_index:end_index])
    )
    return answer

# HTML template for the web interface
HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>Wedding Assistant</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        textarea {
            width: 100%;
            height: 100px;
        }
        button {
            margin-top: 10px;
        }
        .response {
            margin-top: 20px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Wedding Assistant</h1>
    <textarea id="question" placeholder="Type your question here..."></textarea><br>
    <button onclick="askQuestion()">Ask</button>
    <p class="response" id="answer"></p>

    <script>
        async function askQuestion() {
            const question = document.getElementById('question').value;
            const response = await fetch('/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question })
            });
            const data = await response.json();
            document.getElementById('answer').innerText = data.answer;
        }
    </script>
</body>
</html>
"""

# Flask route for serving the HTML page
@app.route("/")
def index():
    return render_template_string(HTML_TEMPLATE)

# API endpoint to handle user questions
@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question", "").lower()
    
    # Check for price-related questions (e.g., "services under 5000")
    price_request_keywords = ["price", "cost", "under", "for", "below", "services for"]
    for keyword in price_request_keywords:
        if keyword in question:
            # Extract the price from the user's input (e.g., "12000")
            price_match = re.search(r'\d+', question)
            if price_match:
                price = int(price_match.group(0))
                
                # Retrieve services that match the price condition (price <= queried price)
                db = connect_to_mongodb()
                services_collection = db["vendors"]
                matching_services = services_collection.find({"price": {"$lte": price}})
                
                # If no services match, inform the user
                if not matching_services:
                    return jsonify({"answer": f"Sorry, there are no services under {price} LKR."})

                # Construct a response with all the matching services
                response = f"Here are the services available under {price} LKR:\n"
                for service in matching_services:
                    response += f"\nService Name: {service['service_name']}\n"
                    response += f"Service Type: {service['service_type']}\n"
                    response += f"Description: {service['description']}\n"
                    response += f"Price: {service['price']} LKR\n"
                    response += f"What We Provide: {service['what_we_provide']}\n"
                    response += "-" * 30  # Separator line for readability
                
                return jsonify({"answer": response})

    # If no price-related question, proceed with general Q&A
    context = """
    Mangalam is a Sri Lankan online wedding planning platform. Couples can find vendors, book weddings, and explore services such as photography, cakes, decoration, and venues.
    """
    
    # Use RoBERTa model to answer general questions
    answer = answer_question(question, context)
    if not answer.strip() or "[CLS]" in answer:
        return jsonify({"answer": "Sorry, I couldn't understand your question. Could you rephrase it?"})

    return jsonify({"answer": answer})

# Run the Flask server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003, debug=True)
