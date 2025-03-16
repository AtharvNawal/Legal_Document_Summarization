import torch
import os
import textract
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
from flask import Flask, request, jsonify
from flask_cors import CORS  # Enable frontend communication
from werkzeug.utils import secure_filename

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Define model directory
MODEL_DIR = "./trained_legal_summarizer"
UPLOAD_FOLDER = "./uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load model and tokenizer
def load_model():
    if os.path.exists(MODEL_DIR):
        tokenizer = PegasusTokenizer.from_pretrained(MODEL_DIR)
        model = PegasusForConditionalGeneration.from_pretrained(MODEL_DIR)
        print("✅ Loaded trained model")
    else:
        tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-large")
        model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-large")
        print("✅ Loaded base model")
    return tokenizer, model

tokenizer, model = load_model()

# Function to extract text from a file
def extract_text_from_file(file_path):
    try:
        text = textract.process(file_path).decode("utf-8")
        return text.strip()
    except Exception as e:
        return f"Error extracting text: {str(e)}"

# Function to summarize text
def summarize_text(input_text):
    if not input_text.strip():
        return "⚠️ No input provided."
    
    inputs = tokenizer(input_text, return_tensors="pt", truncation=True, padding="max_length", max_length=512)
    with torch.no_grad():
        summary_ids = model.generate(
            input_ids=inputs["input_ids"],
            attention_mask=inputs["attention_mask"],
            max_length=128,
            num_beams=5,
            early_stopping=True
        )
    return tokenizer.decode(summary_ids[0], skip_special_tokens=True)

# Route to handle direct text input
@app.route("/summarize/text", methods=["POST"])
def summarize_text_api():
    data = request.json
    input_text = data.get("text", "").strip()
    
    if not input_text:
        return jsonify({"error": "⚠️ No input provided"}), 400
    
    summary = summarize_text(input_text)
    return jsonify({"summary": summary})

# Route to handle file uploads
@app.route("/summarize/file", methods=["POST"])
def summarize_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)
    
    text = extract_text_from_file(file_path)
    if text.startswith("Error"):
        return jsonify({"error": text}), 500
    
    summary = summarize_text(text)
    return jsonify({"summary": summary})

# Run the server
if __name__ == "__main__":
    app.run(debug=True)
