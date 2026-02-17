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

## Known Issues / In Progress
- Mobile layout needs improvement
- Async task loading from API mostly resolved

---

## Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/dralix.git
cd dralix/backend
```

### 2️⃣ Create and activate a virtual environment

**Windows (PowerShell):**
```bash
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**macOS/Linux (bash/zsh):**
```bash
python -m venv venv
source venv/bin/activate
```

### 3️⃣ Install backend dependencies
```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

### 4️⃣ Configure your `.env` file

Create a `.env` file in the `backend/` folder:
```env
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_HOST=localhost
DB_NAME=kanban
SECRET_KEY=some_secret_key
```

> ⚠️ **Important:** Do not commit `.env` to GitHub. Use `.gitignore` to keep it private.

Make sure the database exists in MySQL:
```sql
CREATE DATABASE kanban;
```

### 5️⃣ Run database migrations
```bash
flask db init      # only first time
flask db migrate -m "initial migration"
flask db upgrade
```
This creates the necessary tables for your Kanban board.

### 6️⃣ Run the Flask backend
```bash
flask run
```
> Backend will be available at: `http://127.0.0.1:5000`

### 7️⃣ Serve the frontend
```bash
python -m http.server 8000
```
> Visit `http://localhost:8000` in your browser  
> Make sure the backend is running on `http://127.0.0.1:5000`

**Frontend fetch URL:**
```js
fetch("http://127.0.0.1:5000/api/tasks")
```

### 8️⃣ .env.example
```env
DB_USER=username
DB_PASS=password
DB_HOST=localhost
DB_NAME=kanban
SECRET_KEY=some_secret_key
```
