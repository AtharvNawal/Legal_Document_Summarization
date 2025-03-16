import torch
import pandas as pd
import numpy as np
import evaluate
from transformers import PegasusForConditionalGeneration, PegasusTokenizer, Trainer, TrainingArguments
from datasets import Dataset
from transformers.trainer_utils import EvalPrediction
import os

# Define model directory
MODEL_DIR = "./trained_legal_summarizer"

# Function to check if model is saved
def is_model_saved(model_dir):
    return os.path.exists(model_dir) and all(
        os.path.exists(os.path.join(model_dir, file))
        for file in ["config.json", "pytorch_model.bin", "tokenizer.json"]
    )  

# Load tokenizer and model
if is_model_saved(MODEL_DIR):
    tokenizer = PegasusTokenizer.from_pretrained(MODEL_DIR)
    model = PegasusForConditionalGeneration.from_pretrained(MODEL_DIR)
    print(f"✅ Loaded trained model from {MODEL_DIR}")
else:
    tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-large")
    model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-large")
    print("✅ Loaded base model")

# Load CSV dataset
csv_path = "./dataset/legal_document_dataset_1100.csv"
df = pd.read_csv(csv_path)

# Extract texts and summaries
texts = df["Document Text"].astype(str).tolist()
summaries = df["Summary Text"].astype(str).tolist()

# Tokenization function
def tokenize_function(texts, summaries):
    inputs = tokenizer(texts, truncation=True, padding="max_length", max_length=512, return_tensors="pt")
    targets = tokenizer(summaries, truncation=True, padding="max_length", max_length=128, return_tensors="pt")
    return {
        "input_ids": inputs["input_ids"],
        "attention_mask": inputs["attention_mask"],
        "labels": targets["input_ids"]
    }

# Apply tokenization
encodings = tokenize_function(texts, summaries)

# Custom Dataset class
class CustomDataset(torch.utils.data.Dataset):
    def __init__(self, encodings):
        self.encodings = encodings

    def __len__(self):
        return len(self.encodings["input_ids"])

    def __getitem__(self, idx):
        return {
            "input_ids": self.encodings["input_ids"][idx],
            "attention_mask": self.encodings["attention_mask"][idx],
            "labels": self.encodings["labels"][idx]
        }

# Split dataset (80% train, 20% test)
train_size = int(0.8 * len(texts))
train_dataset = CustomDataset({key: val[:train_size] for key, val in encodings.items()})
test_dataset = CustomDataset({key: val[train_size:] for key, val in encodings.items()})

# Load ROUGE metric
rouge_metric = evaluate.load("rouge")

# Compute metrics function
def compute_metrics(eval_pred: EvalPrediction):
    predictions, labels = eval_pred
    predictions = np.argmax(predictions[0], axis=-1)
    decoded_preds = tokenizer.batch_decode(predictions, skip_special_tokens=True)
    decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)
    result = rouge_metric.compute(predictions=decoded_preds, references=decoded_labels, use_stemmer=True)
    return {key: value * 100 for key, value in result.items()}

# Training arguments
training_args = TrainingArguments(
    output_dir="./results",
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    num_train_epochs=5,
    learning_rate=3e-5,
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=50,
    save_total_limit=2,
    report_to="none"
)

# Train and save model if not already trained
if not is_model_saved(MODEL_DIR):
    print("🚀 Starting training...")
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=test_dataset,
        compute_metrics=compute_metrics
    )
    trainer.train()
    
    # Save the trained model
    os.makedirs(MODEL_DIR, exist_ok=True)
    model.save_pretrained(MODEL_DIR)
    tokenizer.save_pretrained(MODEL_DIR)
    print(f"✅ Model saved to {MODEL_DIR}. Files inside: {os.listdir(MODEL_DIR)}")
else:
    print(f"🔄 Model already trained. Files inside {MODEL_DIR}: {os.listdir(MODEL_DIR)}")

# Function for text summarization
def summarize_text(input_text):
    if not input_text.strip():
        return "⚠️ No input provided. Please enter some text."
    
    inputs = tokenizer(input_text, return_tensors="pt", truncation=True, padding="max_length", max_length=512)
    with torch.no_grad():  # Disable gradient computation for inference
        summary_ids = model.generate(
            input_ids=inputs["input_ids"],
            attention_mask=inputs["attention_mask"],
            max_length=128,
            num_beams=5,
            early_stopping=True
        )
    return tokenizer.decode(summary_ids[0], skip_special_tokens=True)

# Example Usage
if __name__ == "__main__":
    test_text = "This is a sample legal document text that needs summarization."
    summary = summarize_text(test_text)
    print("\n🔹 Summary:", summary)
