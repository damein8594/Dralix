from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()       # <-- single db instance
migrate = Migrate()     # single migrate instance

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://127.0.0.1:5500"])
    app.secret_key = "os_26"
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://tl_S2301348:tl_S2301348@ND-COMPSCI/tl_s2301348_kanban"
    # app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@localhost/kanban"

    db.init_app(app)     # <-- bind the single db to app
    migrate.init_app(app, db)

    from routes import register_routes
    register_routes(app, db)

    return app
