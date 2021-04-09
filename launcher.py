import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from flask_cors import CORS
from flask import Blueprint, Flask, jsonify, request
from flask_restful import reqparse, abort, Api, Resource
import data

app = Flask(__name__)
app.secret_key = 'super secret key'
CORS(app)

# 시군, 시도별 raw data json file을 return
@app.route('/doctors', methods = ['GET', 'POST'])
def doctors():
    return data.num_of_doctors

# 전체 / 대도시 / 지방 평균
@app.route('/doctors-avg', methods = ['GET', 'POST'])
def doctors_avg():
    return jsonify(
        total_avg = data.total_avg,
        metro_avg = data.metro_avg,
        suburb_avg = data.suburb_avg
    )

if __name__ == "__main__":
    app.run("0.0.0.0", port=5000)