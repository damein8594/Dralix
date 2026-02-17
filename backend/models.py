from app import db   # <-- import the same db instance

class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(45), nullable=False)
    status = db.Column(db.String(45), nullable=False)
    description = db.Column(db.String(45), nullable=False)
    storypoint = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "status": self.status,
            "description": self.description,
            "storyPoint": self.storypoint
        }
