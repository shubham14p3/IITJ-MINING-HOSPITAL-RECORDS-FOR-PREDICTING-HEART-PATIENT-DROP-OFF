# app/__init__.py
import os
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app) 
    app.config['DATA_PATH'] = os.path.join(app.root_path, '..', 'csv', 'data.csv')
    from .routes import bp
    app.register_blueprint(bp)
    return app

 