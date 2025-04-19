# app/__init__.py
import os
from flask import Flask

def create_app():
    app = Flask(__name__)
    # Path to your dataset (place heart.csv under data/heart.csv)
    app.config['DATA_PATH'] = os.path.join(app.root_path, '..', 'data', 'heart.csv')
    from .routes import bp
    app.register_blueprint(bp)
    return app