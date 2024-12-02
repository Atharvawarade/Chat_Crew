import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
from sklearn.metrics import classification_report, accuracy_score
from sklearn.pipeline import Pipeline

# Step 1: Example Dataset (replace with real data)
data = {
    "Question": [
        "What is the average admission rate?",
        "What are the eligibility criteria for engineering?",
        "Will I get admission based on last year's cut-off?",
        "How many students were admitted last year?",
        "What are the rules for lateral entry admissions?",
        "Can I predict my chances with my current score?"
    ],
    "Category": [
        "Statistical Question",
        "Admission Rule Question",
        "Prediction Based Question",
        "Statistical Question",
        "Admission Rule Question",
        "Prediction Based Question"
    ]
}

df = pd.DataFrame(data)

# Step 2: Preprocessing
X = df['Question']
y = df['Category']

# Step 3: Splitting the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 4: Build a Pipeline with TF-IDF and SVM
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('svm', SVC(kernel='linear', probability=True))
])

# Step 5: Train the model
pipeline.fit(X_train, y_train)

# Step 6: Evaluate the model
y_pred = pipeline.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Optional: Export the model
import joblib
joblib.dump(pipeline, 'question_classifier.pkl')
