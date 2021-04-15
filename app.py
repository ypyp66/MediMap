from flask import Blueprint, Flask, jsonify, request
import json
import pymongo
import os
from pprint import pprint

app = Flask(__name__)

connection = pymongo.MongoClient("localhost", 27017)
connection.drop_database('medi')

db = connection["medi"]

ambulance_main_column = db["ambulance_main"]
diagnosis_main_column = db["diagnosis_main"]
hospital_main_column = db["hospital_main"]
doctors_main_column = db["doctors_main"]

ambulance_detail_column = db["ambulance_detail"]
diagnosis_detail_column = db["diagnosis_detail"]
hospital_detail_column = db["hospital_detail"]
doctors_detail_column = db["doctors_detail"]

dir = os.path.dirname(os.path.realpath(__file__)).replace('\\', '/') + '/'

# main
with open(dir + './main_data/ambul_medic.json') as file:
    json_string = file.read()    
    ambulance_main = json.loads(json_string)
    ambulance_main_data = ambulance_main_column.insert_many(ambulance_main)
with open(dir + './main_data/diagnosis.json') as file:
    json_string = file.read()    
    diagnosis_main = json.loads(json_string)
    diagnosis_main_data = diagnosis_main_column.insert_many(diagnosis_main)
with open(dir + './main_data/hospital.json') as file:
    json_string = file.read()    
    hospital_main = json.loads(json_string)
    hospital_main_data = hospital_main_column.insert_many(hospital_main)
with open(dir + './main_data/doctor.json') as file:
    json_string = file.read()    
    doctors_main = json.loads(json_string)
    doctors_main_data = doctors_main_column.insert_many(doctors_main)

# detail
with open(dir + './detail_data/ambul_medic_detail.json') as file:
    json_string = file.read()    
    ambulance_detail = json.loads(json_string)
    ambulance_detail_data = ambulance_detail_column.insert_many(ambulance_detail)
with open(dir + './detail_data/diagnosis_detail.json') as file:
    json_string = file.read()    
    diagnosis_detail = json.loads(json_string)
    diagnosis_detail_data = diagnosis_detail_column.insert_many(diagnosis_detail)
with open(dir + './detail_data/hospital.json') as file:
    json_string = file.read()    
    hospital_detail = json.loads(json_string)
    hospital_detail_data = hospital_detail_column.insert_many(hospital_detail)
with open(dir + './detail_data/num_of_doctors_for_detail_page.json') as file:
    json_string = file.read()    
    doctors_detail = json.loads(json_string)
    doctors_detail_data = doctors_detail_column.insert_many(doctors_detail)

# DB에 잘들어갔는지 확인용 코드
for doc in ambulance_detail_column.find({}, {'_id': False}):
    pprint(doc)

@app.route('/', methods = ['GET', 'POST'])
def main():
    return "main"

# 의사 메인
@app.route('/doctor', methods = ['GET', 'POST'])
def doctor_info():
    temp = []
    for doc in doctors_main_column.find({}, {'_id': False}):
        temp.append(doc)
    return jsonify(temp)

# 병원 메인
@app.route('/hospital', methods = ['GET', 'POST'])
def hospital_info():
    temp = []
    for doc in hospital_main_column.find({}, {'_id': False}):
        temp.append(doc)
    return jsonify(temp)

# 응급차 메인
@app.route('/ambulance', methods = ['GET', 'POST'])
def ambulance_info():
    temp = []
    for doc in ambulance_main_column.find({}, {'_id': False}):
        temp.append(doc)
    return jsonify(temp)

# 진료 메인
@app.route('/diagnosis', methods = ['GET', 'POST'])
def diagnosis_info():
    temp = []
    for doc in diagnosis_main_column.find({}, {'_id': False}):
        temp.append(doc)
    return jsonify(temp)

# 상세 페이지 전체
@app.route('/detail', methods = ['GET', 'POST'])
def doctor_detail():
    detail, doctor_list, hospital_list, ambulance_list, diagnosis_list  = [], [], [], [], []
    for doc in doctors_detail_column.find({}, {'_id': False}):
        doctor_list.append(doc)
    for doc in hospital_detail_column.find({}, {'_id': False}):
        hospital_list.append(doc)
    for doc in ambulance_detail_column.find({}, {'_id': False}):
        ambulance_list.append(doc)
    for doc in diagnosis_detail_column.find({}, {'_id': False}):
        diagnosis_list.append(doc)
    detail.append(doctor_list)
    detail.append(hospital_list)
    detail.append(ambulance_list)
    detail.append(diagnosis_list)
    # print(detail)
    return jsonify(detail)

# 병원 상세
# @app.route('/hospital_detail', methods = ['GET', 'POST'])
# def hospital_detail():
#     temp = []
#     for doc in hospital_detail_column.find({}, {'_id': False}):
#         temp.append(doc)
#     return jsonify(temp)

# # 응급, 의료인력 상세
# @app.route('/ambulance_detail', methods = ['GET', 'POST'])
# def ambulance():
#     temp = []
#     for doc in ambulance_detail_column.find({}, {'_id': False}):
#         temp.append(doc)
#     return jsonify(temp)

# # 진료 상세
# @app.route('/diagnosis_detail', methods = ['GET', 'POST'])
# def diagnosis_detail():
#     temp = []
#     for doc in diagnosis_detail_column.find({}, {'_id': False}):
#         temp.append(doc)
#     return jsonify(temp)