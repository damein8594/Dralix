from flask import request, jsonify

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
        data = request.get_json()
        task = Task(
            title=data.get("title", "No title"),
            status=data.get("status", "todo"),
            description=data.get("description", ""),
            storypoint=data.get("storyPoint", 1)
        )
        db.session.add(task)
        db.session.commit()
        # Return the full task so the frontend gets the real DB id
        return jsonify(task.to_dict()), 201

    @app.route("/api/tasks/<int:task_id>", methods=["PUT"])
    def update_task(task_id):
        task = Task.query.get_or_404(task_id)
        data = request.get_json()
        task.title = data.get("title", task.title)
        task.status = data.get("status", task.status)
        task.description = data.get("description", task.description)
        task.storypoint = data.get("storyPoint", task.storypoint)
        db.session.commit()
        return jsonify(task.to_dict())

    @app.route("/api/tasks/<int:task_id>", methods=["DELETE"])
    def delete_task(task_id):
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted"}), 200