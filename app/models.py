from extensions import db

class ImageResponse(db.Model):
    __tablename__ = 'image_response'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)
    predicted_breed = db.Column(db.String(50))
    user_answer = db.Column(db.String(50))
    uploaded_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())


    def __repr__(self):
        return f"<ImageResponse {self.id}>"

from extensions import db
from flask_login import UserMixin

class User(UserMixin, db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return f"<User {self.username}>"

class Player(db.Model):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    score = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Player {self.name}>'