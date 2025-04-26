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
def load_data(clean=True):
    global _df
    if _df is None:
        data_path = current_app.config.get('DATA_PATH')
        if not data_path or not os.path.exists(data_path):
            abort(500, description=f"Dataset not found at {data_path}")
        # Chunked reading to simulate big data
        chunks = []
        for chunk in pd.read_csv(data_path, chunksize=5000):
            chunks.append(chunk)
        _df = pd.concat(chunks, ignore_index=True)
    df = _df.copy()
    if clean:
        df = clean_data(df)
    return df

def clean_data(df):
    """Apply cleaning steps: drop 'fbs', fillna with mean, remove negatives."""
    df = df.drop('fbs', axis=1, errors='ignore')
    df = df.fillna(df.mean())
    if 'age' in df.columns:
        df = df[df['age'] >= 0]
    if 'trestbps' in df.columns:
        df = df[df['trestbps'] >= 0]
    if 'chol' in df.columns:
        df = df[df['chol'] >= 0]
    return df

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

# Model definitions
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
    if model_name not in models:
        abort(404, description="Model not supported")
    splits = get_splits()
    model = models[model_name]() if callable(models[model_name]) else models[model_name]
    if model_name in ['linear_regression', 'random_forest', 'gradient_boosting', 'xgboost']:
        buf = _plot_regression(model, model_name.replace('_', ' ').title())
    else:
        buf = _plot_classification(model, model_name.replace('_', ' ').title())
    return send_file(buf, mimetype='image/png')

@bp.route('/<model_name>/predict', methods=['POST'])
def model_predict(model_name):
    if model_name not in models:
        abort(404, description="Model not supported")
    data = request.get_json()
    if not data:
        abort(400, description="JSON body required with feature values")
    df = load_data()
    feature_cols = df.drop('target', axis=1).columns.tolist()
    try:
        input_df = pd.DataFrame([{col: data[col] for col in feature_cols}])
    except KeyError as e:
        abort(400, description=f"Missing feature: {e}")
    splits = get_splits()
    model = models[model_name]() if callable(models[model_name]) else models[model_name]
    model.fit(splits['X_train'], splits['y_train'])
    pred = model.predict(input_df)
    result = {'prediction': int(pred[0])}
    if hasattr(model, 'predict_proba'):
        proba = model.predict_proba(input_df)[0].tolist()
        result['probability'] = proba
    return jsonify(result)

# Internal plotting
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
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)
    return buf

def _plot_classification(model, name):
    splits = get_splits()
    model.fit(splits['X_train'], splits['y_train'])
    preds = model.predict(splits['X_test'])
    acc = accuracy_score(splits['y_test'], preds)
    cm = confusion_matrix(splits['y_test'], preds)
    fig, ax = plt.subplots()
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=ax)
    ax.set_xlabel('Predicted')
    ax.set_ylabel('Actual')
    ax.set_title(f'{name} (Accuracy = {acc:.2f})')
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)
    return buf

# Data routes
@bp.route('/data', methods=['GET'])
def data():
    df = load_data()
    records = df.to_dict(orient='records')
    return jsonify(records)

@bp.route('/data/info', methods=['GET'])
def data_info():
    df = load_data()
    info = [
        {
            'column': col,
            'non_null': int(df[col].count()),
            'dtype': str(df[col].dtype)
        }
        for col in df.columns
    ]
    describe = df.describe().to_dict()
    return jsonify({'info': info, 'describe': describe})

@bp.route('/data/clean', methods=['GET'])
def data_clean():
    df = _df.copy() if _df is not None else load_data(clean=False)
    missing_before = df.isnull().sum().to_dict()
    df = clean_data(df)
    missing_after = df.isnull().sum().to_dict()
    correlation = df.corr().to_dict()
    return jsonify({
        'missing_before': missing_before,
        'missing_after': missing_after,
        'correlation': correlation,
        'cleaning_steps': [
            "Dropped column: fbs",
            "Filled missing values with column mean",
            "Removed rows with negative age, BP, or cholesterol"
        ]
    })

@bp.route('/data/corr', methods=['GET'])
def data_corr():
    df = load_data()
    correlation = df.corr().to_dict()
    return jsonify({'correlation': correlation})

@bp.route('/data/hist', methods=['GET'])
def data_hist():
    df = load_data()
    fig, axes = plt.subplots(nrows=(len(df.columns) + 2) // 3, ncols=3, figsize=(15, 10))
    axes = axes.flatten()
    for i, col in enumerate(df.columns):
        df[col].hist(ax=axes[i], edgecolor='black')
        axes[i].set_title(col)
    for j in range(i + 1, len(axes)):
        fig.delaxes(axes[j])
    buf = io.BytesIO()
    fig.tight_layout()
    fig.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)
    return send_file(buf, mimetype='image/png')

@bp.route('/metrics', methods=['GET'])
def model_metrics():
    splits = get_splits()
    X_train, X_test = splits['X_train'].copy(), splits['X_test'].copy()
    y_train, y_test = splits['y_train'], splits['y_test']

    results = {}
    for name, factory in models.items():
        model = factory() if callable(factory) else factory
        model.fit(X_train, y_train)
        preds = model.predict(X_test)

        if hasattr(model, "predict_proba"):
            score = accuracy_score(y_test, preds)
            metric = "accuracy"
        else:
            score = r2_score(y_test, preds)
            metric = "r2"

        results[name] = {
            "metric": metric,
            "score": round(float(score), 4)
        }

    return jsonify(results)
