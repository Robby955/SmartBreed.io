from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

# Create the SQLAlchemy instance
db = SQLAlchemy()

# Create the LoginManager instance
login_manager = LoginManager()
