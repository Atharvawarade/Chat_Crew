import joblib

# Load the trained model (assuming 'question_classifier.pkl' is already trained and saved)
pipeline = joblib.load('question_classifier.pkl')

def classify_question(question):
    # Use the model to predict the category of the given question
    category = pipeline.predict([question])[0]
    return category

# Example: You can call classify_question() with your question
new_question = input("Enter your question: ")
predicted_category = classify_question(new_question)
print(f"The question is classified as: {predicted_category}")
