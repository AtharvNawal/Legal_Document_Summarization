from flask import Flask, request, jsonify
import torch
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
import os
from flask_cors import CORS

# Define model directory
MODEL_DIR = "./trained_legal_summarizer"

# Check if CUDA (GPU) is available
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# Load model and tokenizer
try:
    tokenizer = PegasusTokenizer.from_pretrained(MODEL_DIR)
    model = PegasusForConditionalGeneration.from_pretrained(MODEL_DIR).to(DEVICE)
    print("✅ Model and tokenizer loaded successfully.")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    exit(1)  # Stop execution if model loading fails

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/summarize": {"origins": "*"}})  # Allow all origins for /summarize

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Legal Text Summarizer API is running!"})

# Summarization endpoint
@app.route("/summarize", methods=["POST"])
def summarize():
    try:
        data = request.json
        input_text = data.get("text", "").strip()

        if not input_text:
            return jsonify({"error": "⚠️ No input provided"}), 400

        inputs = tokenizer(input_text, return_tensors="pt", truncation=True, padding="max_length", max_length=512).to(DEVICE)

        with torch.no_grad():
            summary_ids = model.generate(
                input_ids=inputs["input_ids"],
                attention_mask=inputs["attention_mask"],
                max_length=128,
                num_beams=5,
                early_stopping=True
            )

        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        return jsonify({"summary": summary})

    except Exception as e:
        return jsonify({"error": f"❌ An error occurred: {str(e)}"}), 500

# Run the server
if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 5001))  # Use environment variable or default to 5000
    try:
        app.run(host="0.0.0.0", port=PORT, debug=True)
    except OSError as e:
        print(f"❌ Port {PORT} is in use. Try a different port.")
