from app import create_app
from flask import session

flask_app = create_app()

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))  # use Render's port if available
    flask_app.run(host="0.0.0.0", port=port)

