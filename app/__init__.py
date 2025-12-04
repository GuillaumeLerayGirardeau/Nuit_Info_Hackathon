from flask import Flask, render_template, redirect, url_for, request
from flask_restx import Api

def create_app():
    app = Flask(__name__)

    # Creation d'une api
    api = Api(
        app,
        version='1.0',
        title='NIRD API',
        description='NIRD N2I API',
        doc='/api/',
        prefix='/api'
    )

    @app.route('/')
    def index():
        return redirect('/index')
    
    @app.route('/index')
    def home():
        return render_template('index.html')
    
    @app.route('/durabilite')
    def durabilite():
        return render_template('durabilite.html')
    
    return app