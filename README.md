# Dralix
A drag-and-drop Kanban board with story point estimation, built with vanilla JS, Flask, and MySQL.

## Features
- Drag and drop tasks across Todo, Doing, and Done columns
- Create, edit, and delete tasks
- Story point estimator based on complexity, risk, and familiarity
- REST API built with Flask and SQLAlchemy
- Dark/light theme toggle

## Tech Stack
- **Frontend:** JavaScript, HTML, CSS
- **Backend:** Flask, Flask-SQLAlchemy, Flask-CORS
- **Database:** MySQL

- ## Known Issues / In Progress
- Mobile layout needs improvement
- Async task loading from API not fully resolved

## Setup

### Backend
```bash
git clone https://github.com/your-username/dralix.git
cd dralix/backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
flask run
```

### Frontend
Open `index.html` in your browser or serve it locally:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`. Make sure the backend is running first.
