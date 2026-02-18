import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    load_dotenv()

    user = os.getenv("DB_USER")
    password = os.getenv("DB_PASS")
    host = os.getenv("DB_HOST")
    db_name = os.getenv("DB_NAME")

    CORS(app, origins=[
        "http://127.0.0.1:5500",         # local dev
        "https://dralix.damein.space"    # production frontend
    ])

    app.secret_key = os.getenv("SECRET_KEY", "fallback-dev-key")
    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql+psycopg://{user}:{password}@{host}/{db_name}"

    db.init_app(app)
    migrate.init_app(app, db)

    from routes import register_routes
    register_routes(app, db)

    return app
