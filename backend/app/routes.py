# app/routes.py
import io
import os
from flask import Blueprint, current_app, send_file, abort, request, jsonify
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.tree import DecisionTreeClassifier
import xgboost as xgb
from sklearn.metrics import accuracy_score, confusion_matrix, r2_score

bp = Blueprint('api', __name__, url_prefix='/api')

# Load and cache data once
_df = None
def load_data():
    global _df
    if _df is None:
        data_path = current_app.config.get('DATA_PATH')
        if not data_path or not os.path.exists(data_path):
            abort(500, description=f"Dataset not found at {data_path}")
        _df = pd.read_csv(data_path)
    return _df

# Helper: split once
_splits = {}
def get_splits():
    if not _splits:
        df = load_data()
        X = df.drop('target', axis=1)
        y = df['target']
        _splits['X_train'], _splits['X_test'], _splits['y_train'], _splits['y_test'] = \
            train_test_split(X, y, test_size=0.2, random_state=42)
    return _splits

# Generic train utilities
models = {
    'linear_regression': LinearRegression,
    'logistic_regression': lambda: LogisticRegression(max_iter=1000),
    'svm': lambda: SVC(kernel='linear', probability=True),
    'naive_bayes': GaussianNB,
    'decision_tree': DecisionTreeClassifier,
    'random_forest': lambda: RandomForestRegressor(n_estimators=100),
    'gradient_boosting': lambda: GradientBoostingRegressor(n_estimators=100, max_depth=4),
    'xgboost': lambda: xgb.XGBRegressor(objective='reg:squarederror', colsample_bytree=0.3,
                                        learning_rate=0.1, max_depth=5, alpha=10,
                                        n_estimators=10, disable_default_eval_metric=True)
}

@bp.route('/<model_name>', methods=['GET'])
def model_plot(model_name):
    """
    GET /api/<model_name> -> returns PNG plot of model performance
    """
    if model_name not in models:
        abort(404, description="Model not supported")
    splits = get_splits()
    model = models[model_name]() if callable(models[model_name]) else models[model_name]
    # Choose classification vs regression
    if model_name in ['linear_regression', 'random_forest', 'gradient_boosting', 'xgboost']:
        buf = _plot_regression(model, model_name.replace('_', ' ').title())
    else:
        buf = _plot_classification(model, model_name.replace('_', ' ').title())
    return send_file(buf, mimetype='image/png')

@bp.route('/<model_name>/predict', methods=['POST'])
def model_predict(model_name):
    """
    POST /api/<model_name>/predict
    JSON body: feature key:value pairs
    Returns JSON with prediction and, if available, probability
    """
    if model_name not in models:
        abort(404, description="Model not supported")
    data = request.get_json()
    if not data:
        abort(400, description=" JSON body required with feature values ")
    # Prepare input
    df = load_data()
    feature_cols = df.drop('target', axis=1).columns.tolist()
    try:
        input_df = pd.DataFrame([ {col: data[col] for col in feature_cols} ])
    except KeyError as e:
        abort(400, description=f"Missing feature: {e}")
    # Train model
    splits = get_splits()
    model = models[model_name]() if callable(models[model_name]) else models[model_name]
    model.fit(splits['X_train'], splits['y_train'])
    pred = model.predict(input_df)
    result = {'prediction': int(pred[0])}
    # Add probability for classifiers
    if hasattr(model, 'predict_proba'):
        proba = model.predict_proba(input_df)[0].tolist()
        result['probability'] = proba
    return jsonify(result)

# Internal plotting functions

def _plot_regression(model, name):
    splits = get_splits()
    model.fit(splits['X_train'], splits['y_train'])
    y_pred = model.predict(splits['X_test'])
    score = r2_score(splits['y_test'], y_pred)
    fig, ax = plt.subplots()
    ax.scatter(splits['y_test'], y_pred)
    ax.plot([splits['y_test'].min(), splits['y_test'].max()],
            [splits['y_test'].min(), splits['y_test'].max()], 'r--')
    ax.set_xlabel('Actual')
    ax.set_ylabel('Predicted')
    ax.set_title(f'{name} (R2 = {score:.2f})')
    buf = io.BytesIO(); fig.savefig(buf, format='png', bbox_inches='tight'); buf.seek(0); plt.close(fig)
    return buf

def _plot_classification(model, name):
    splits = get_splits()
    model.fit(splits['X_train'], splits['y_train'])
    preds = model.predict(splits['X_test'])
    acc = accuracy_score(splits['y_test'], preds)
    cm = confusion_matrix(splits['y_test'], preds)
    fig, ax = plt.subplots()
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=ax)
    ax.set_xlabel('Predicted'); ax.set_ylabel('Actual'); ax.set_title(f'{name} (Accuracy = {acc:.2f})')
    buf = io.BytesIO(); fig.savefig(buf, format='png', bbox_inches='tight'); buf.seek(0); plt.close(fig)
    return buf

@bp.route('/data', methods=['GET'])
def data():
    """
    GET /api/data -> returns the entire CSV as JSON
    """
    df = load_data()  # loads and caches your CSV
    # convert to list‑of‑dicts
    records = df.to_dict(orient='records')
    return jsonify(records)

# app/routes.py

@bp.route('/data/info', methods=['GET'])
def data_info():
    """
    GET /api/data/info -> returns column metadata and describe() stats as JSON
    """
    df = load_data()
    # column info
    info = [
        {
            'column': col,
            'non_null': int(df[col].count()),
            'dtype': str(df[col].dtype)
        }
        for col in df.columns
    ]
    # summary statistics
    describe = df.describe().to_dict()
    return jsonify({
        'info': info,
        'describe': describe
    })

@bp.route('/data/clean', methods=['GET'])
def data_clean():
    """
    GET /api/data/clean -> returns missing‑value counts and correlation matrix (after dropping 'fbs').
    """
    df = load_data()
    missing = df.isnull().sum().to_dict()
    df2 = df.drop('fbs', axis=1)
    correlation = df2.corr().to_dict()
    return jsonify({
        'missing': missing,
        'correlation': correlation
    })
