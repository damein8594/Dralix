from flask import Flask, request, jsonify

def register_routes(app, db):
    from models import Task

    @app.route("/api/tasks", methods=["GET"])
    def get_tasks():
        try:
            tasks = Task.query.all()
            return jsonify([t.to_dict() for t in tasks])
        except Exception as e:
            print("Error in GET /api/tasks:", e)
            return jsonify({"error": str(e)}), 500

    @app.route("/api/tasks", methods=["POST"])
    def create_task():
        from models import Task
        data = request.get_json()
        task = Task(
            title=data.get("title", "No title"),
            status=data.get("status", "todo"),
            description=data.get("description", ""),
            storypoint=data.get("storyPoint", 1)
        )
        db.session.add(task)
        db.session.commit()
        return jsonify({"message": "Task created"}), 201
