QuizApp in chat interface.

## Getting Started

To start contributing:

```bash
npm install
.env.example > .env
npm run dev
```

### UI

- Initiating (npm i && npm run dev)
- Home Page
- Initial Assessment
  - Details Card - Submit topic of the quiz
  - Based on form details
    - Fetches questions from DB
    - Creates quiz with new 'id' (save db)
- Main UI Components
  - Chat-Box
  - Chat-Messages
  - MCQ-Box
  - Feedback-Box
  - Explanation-PopOver
  - View-Score
- Features
  - Chat Interface - with Welcome and Conclusion msgs
  - Select answer either by clicking on options or sending a msg
  - Get explanation for each question by clicking on pop-up
  - Submit feedback for every quiz questions
  - View score analysis

### DB Setup for Events

Fetch

- User Details
- Quiz Questions
  Create
- Creation of New Quiz
- Submitting Quiz
- Feedback

### API Routes

- Together API (api/explain-bot) : Makes an API call to Together LLM to fetch explanation for questions

### Language App
