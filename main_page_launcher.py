import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import json

from flask_cors import CORS
from flask import Blueprint, Flask, jsonify, request
from flask_restful import reqparse, abort, Api, Resource

app = Flask(__name__)
app.secret_key = 'super secret key'
CORS(app)

with open('./json_files_for_main/doctor.json') as json_file:
    doctor_data = json.load(json_file)

with open('./json_files_for_main/hospital.json') as json_file:
    hospital_data = json.load(json_file)

with open('./json_files_for_main/ambul_medic.json') as json_file:
    ambul_medic_data = json.load(json_file)

# 의사
@app.route('/doctor', methods = ['GET', 'POST'])
def doctor_info():
    return jsonify(doctor_data)

# 병원
@app.route('/hospital', methods = ['GET', 'POST'])
def hospital_info():
    return jsonify(hospital_data)
    
# 응급, 의료인력
@app.route('/ambul-medic', methods = ['GET', 'POST'])
def ambul_medic_info():
    return jsonify(ambul_medic_data)

if __name__ == "__main__":
    app.run("0.0.0.0", port=5000)