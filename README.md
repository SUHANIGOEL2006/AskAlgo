# Academic Chatbot (Simple Version)

### 💡 How It Works
- You open `index.html` in a browser.
- Ask a question.
- It sends the question to the Python backend.
- Backend uses ML to find the best answer from a local JSON file.

### 📦 Requirements

#### Python Setup (Backend)
- Python 3.8+
- Install dependencies:

```
pip install fastapi uvicorn sentence-transformers
```

#### Run the Backend
```
run_backend.bat
```

#### Open the Frontend
```
open_frontend.bat
```

Now you can type a question and get an answer!
