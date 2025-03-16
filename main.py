from transformers import PegasusForConditionalGeneration, PegasusTokenizer

MODEL_DIR = r"/Users/atharvnawal/Desktop/OG final legal text Summerizer"

# Download and save
tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")

tokenizer.save_pretrained(MODEL_DIR)
model.save_pretrained(MODEL_DIR)