from sentence_transformers import SentenceTransformer, util
import json
import os

model = SentenceTransformer('all-MiniLM-L6-v2')

def load_faq():
    faq_path = os.path.join(os.path.dirname(__file__), 'data', 'faq.json')
    with open(faq_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def get_answer(user_question):
    faq_data = load_faq()
    questions = [item['question'] for item in faq_data]
    answers = [item['answer'] for item in faq_data]

    user_embedding = model.encode(user_question, convert_to_tensor=True)
    faq_embeddings = model.encode(questions, convert_to_tensor=True)
    scores = util.pytorch_cos_sim(user_embedding, faq_embeddings)[0]

    best_index = scores.argmax().item()
    best_score = scores[best_index].item()

    # Set a threshold — tweak if needed
    threshold = 0.5

    if best_score < threshold:
        return "Sorry, I didn’t get that. Could you please rephrase it?"

    return answers[best_index]
