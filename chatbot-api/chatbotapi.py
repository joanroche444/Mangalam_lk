from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForQuestionAnswering, AutoTokenizer
import torch

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load RoBERTa model and tokenizer
model_name = "deepset/roberta-base-squad2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForQuestionAnswering.from_pretrained(model_name)

# FAQ Responses (you can expand this as needed)
faq_responses = {
    "rsvp": "Guests can update their RSVP by going to the 'My Attendance' page.",
    "wedding services": "Yes, we offer services like photography, music, decoration, and catering. You can also book a stage for dance and custom wedding cakes.",
    "photography services": "Yes, we offer photography services for your wedding. Would you like to book one?",
    "music services": "Yes, we provide music services to suit your wedding theme.",
    "catering services": "Yes, we offer catering services with a variety of menus.",
   "cake": 'We offer cakes! .1  Go to the services section: <a href="http://localhost:5173/AllService" target="_blank" style="text-decoration: underline;">Click here to select the service you want</a> filter with cake option if you find your vendor add that to project'
}

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

# Function to check if the question matches FAQ responses
def get_faq_response(question):
    # Normalize question to lowercase for matching
    question = question.lower()
    
    for key, response in faq_responses.items():
        if key in question:
            return response
    return None  # No FAQ match

# Define the chatbot API endpoint
@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question")
    
    # Check if the question matches an FAQ response
    faq_answer = get_faq_response(question)
    if faq_answer:
        return jsonify({"answer": faq_answer})
    
    # Default context (You can modify this based on your app)
    context = """
    Mangalam is an online wedding planning platform where everything is in one place. 
    wedding service section is the section where all the vendors for mangalam is available ,services is there so a couple can pick there prefered vendor 
    """
    
    # If it's the first request, greet the user
    if question.lower() == "hi" or question.lower() == "hello":
        return jsonify({"answer": "Hi, I am Lia, your personal assistant. How may I help you?"})
    
    # Otherwise, answer the user's question using the model
    answer = answer_question(question, context)
    return jsonify({"answer": answer})

# Run the Flask server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003, debug=True)
