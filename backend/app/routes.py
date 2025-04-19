# app/routes.py
import io
import os
from flask import Blueprint, current_app, send_file, abort
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

def load_data():
    data_path = current_app.config.get('DATA_PATH')
    if not data_path or not os.path.exists(data_path):
        abort(500, description=f"Dataset not found at {data_path}")
    return pd.read_csv(data_path)

def split_data(df):
    X = df.drop('target', axis=1)
    y = df['target']
    return train_test_split(X, y, test_size=0.2, random_state=42)

def train_and_plot_regression(model, name):
    df = load_data()
    X_train, X_test, y_train, y_test = split_data(df)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    score = r2_score(y_test, y_pred)
    fig, ax = plt.subplots()
    ax.scatter(y_test, y_pred)
    ax.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--')
    ax.set_xlabel('Actual')
    ax.set_ylabel('Predicted')
    ax.set_title(f'{name} (R2 = {score:.2f})')
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    plt.close(fig)
    buf.seek(0)
    return buf

def train_and_plot_classification(model, name):
    df = load_data()
    X_train, X_test, y_train, y_test = split_data(df)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    cm = confusion_matrix(y_test, y_pred)
    fig, ax = plt.subplots()
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=ax)
    ax.set_xlabel('Predicted')
    ax.set_ylabel('Actual')
    ax.set_title(f'{name} (Accuracy = {acc:.2f})')
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    plt.close(fig)
    buf.seek(0)
    return buf

@bp.route('/linear_regression')
def linear_regression():
    buf = train_and_plot_regression(LinearRegression(), 'Linear Regression')
    return send_file(buf, mimetype='image/png')

@bp.route('/logistic_regression')
def logistic_regression():
    buf = train_and_plot_classification(LogisticRegression(max_iter=1000), 'Logistic Regression')
    return send_file(buf, mimetype='image/png')

@bp.route('/svm')
def svm_endpoint():
    buf = train_and_plot_classification(SVC(kernel='linear', probability=True), 'Support Vector Machine')
    return send_file(buf, mimetype='image/png')

@bp.route('/naive_bayes')
def naive_bayes():
    buf = train_and_plot_classification(GaussianNB(), 'Naive Bayes')
    return send_file(buf, mimetype='image/png')

@bp.route('/decision_tree')
def decision_tree():
    buf = train_and_plot_classification(DecisionTreeClassifier(), 'Decision Tree')
    return send_file(buf, mimetype='image/png')

@bp.route('/random_forest')
def random_forest():
    buf = train_and_plot_regression(RandomForestRegressor(n_estimators=100), 'Random Forest Regression')
    return send_file(buf, mimetype='image/png')

@bp.route('/gradient_boosting')
def gradient_boosting():
    buf = train_and_plot_regression(GradientBoostingRegressor(n_estimators=100, max_depth=4), 'Gradient Boosting Regression')
    return send_file(buf, mimetype='image/png')

@bp.route('/xgboost')
def xgboost_endpoint():
    model = xgb.XGBRegressor(objective='reg:squarederror', colsample_bytree=0.3, learning_rate=0.1,
                             max_depth=5, alpha=10, n_estimators=10, disable_default_eval_metric=True)
    buf = train_and_plot_regression(model, 'XGBoost Regression')
    return send_file(buf, mimetype='image/png')
