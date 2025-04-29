
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
    "wedding services": """
        Yes, we offer a variety of wedding services to make your big day special, including:
        <ul>
            <li><a href="http://localhost:5173/AllService" target="_blank" style="text-decoration: underline;">Photography & Videography</a></li>
            <li><a href="http://localhost:5173/AllService" target="_blank" style="text-decoration: underline;">Cakes</a></li>
            <li><a href="http://localhost:5173/AllService" target="_blank" style="text-decoration: underline;">Decoration</a></li>
            <li><a href="http://localhost:5173/AllService" target="_blank" style="text-decoration: underline;">Venue</a></li>
        </ul>
        To explore all available services, please <a href="http://localhost:5173/AllService" target="_blank" style="text-decoration: underline;">click here</a>.
    """,
    "photography services": """
        We offer a range of photography services for your wedding! 📸
        To explore available photography vendors, you can either:
        <ul>
            <li>Go to the 'Vendors' section in the navigation bar and select the photography category, or</li>
            <li>Click <a href="http://localhost:5173/AllService" target="_blank" style="text-decoration: underline;">here</a> to directly visit the services section and filter by photography vendors.</li>
        </ul>
        Once you find a photographer you like, you can add them to your project. Let us know if you need any assistance!
    """,
    "catering services": """
        We offer a wide variety of catering services to suit your wedding's taste! 🍽️
        To explore available catering vendors, you can either:
        <ul>
            <li>Go to the 'Vendors' section in the navigation bar and select the catering category, or</li>
            <li>Click <a href="http://localhost:5173/AllService" target="_blank" style="text-decoration: underline;">here</a> to directly visit the services section and filter by catering vendors.</li>
        </ul>
        Once you find a vendor that fits your needs, you can add them to your project. Let us know if you need help!
    """,
    "decoration services": """
        I see you are intrested in our decoration Services!💐
        To explore available decoration vendors, you can either:
        <ul>
            <li>Go to the 'Vendors' section in the navigation bar and select the decoration category, or</li>
            <li>Click <a href="http://localhost:5173/AllService" target="_blank" style="text-decoration: underline;">here</a> to directly visit the services section and filter by decoration vendors.</li>
        </ul>
        Once you find a decorator you love, you can add them to your project. Let us know if you need any assistance!
    """,
    "venue services": """
        We offer beautiful venues for your wedding day! 🏰
        To explore available venue options, you can either:
        <ul>
            <li>Go to the 'Vendors' section in the navigation bar and select the venue category, or</li>
            <li>Click <a href="http://localhost:5173/AllService" target="_blank" style="text-decoration: underline;">here</a> to directly visit the services section and filter by venue options.</li>
        </ul>
        Once you find a venue that suits your style, you can add it to your project. Let us know if you need any help!
    """,
    "how many vendors": "We currently have 7 vendors available on our platform, offering a variety of services to make your wedding day perfect.",
    "manage wedding budget": """
        To manage your wedding budget, you can use the budget dashboard on Mangalam. Here's how you can do it:
        <ul>
            <li>Visit the <a href="http://localhost:5174/budgetdash" target="_blank" style="text-decoration: underline;">Budget Dashboard</a></li>
            <li>Click on 'Add Income' to start tracking your expenses.</li>
            <li>Add your necessary wedding expenses to keep track of your wedding budget.</li>
        </ul>
        This will help you stay organized and ensure you are on track with your wedding budget.
    """,
    "website color palette": """
        The color palette for this website includes shades such as:
        <ul>
            <li><strong>Reddish-Brown (#A85D50)</strong></li>
            <li><strong>Black</strong></li>
        </ul>
        These colors are used to create a warm, inviting, and professional aesthetic for the site.
    """
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
    Mangalam is a sri lankan online wedding planning platform, couples can find vendors and book wedding ,The platform offers a variety of wedding services such as photography, cakes, decoration, and venues. For more details, users can visit the All Services page at,The platform provides various photography services. To view available photography vendors, users
    
    """
    
    # If it's the first request, greet the user
    if question.lower() == "hi" or question.lower() == "hello":
        return jsonify({"answer": "Hi, I am Lia, your personal assistant. How may I help you?"})
    
    # Otherwise, answer the user's question using the model
    answer = answer_question(question, context)
    if not answer.strip() or "[CLS]" in answer:
        return jsonify({"answer": "I'm sorry, I'm still training. Could you rephrase your question?"})
    return jsonify({"answer": answer})

# Run the Flask server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003, debug=True)
