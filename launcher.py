import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns


from flask import Blueprint, Flask, jsonify, request
from flask_restful import reqparse, abort, Api, Resource
import data

app = Flask(__name__)

parser_num_of_doctors = reqparse.RequestParser()

parser_num_of_doctors.add_argument('sido')
parser_num_of_doctors.add_argument('sigungu')

# 시군, 시도별 raw data json file을 return
@app.route('/doctors', methods = ['GET', 'POST'])
def doctors():
    return data.num_of_doctors


# 프론트에서 변수명 : 'sido' 또는 'sigungu' 로 넘겨주면 해당 시도의 정보를 return

# @app.route('/doctors-area', methods = ['GET', 'POST'])
# def indications_by_sido():
#     args = parser_num_of_doctors.parse_args()

#     if args['sigungu']:
#         sigungu = args['sigungu']
#         sido = args['sido']
#         return data.return_num_of_docs(sigungu)
#         return jsonify(
#             status = 200,
#             result = {
#                 'num_of_docs_in_sigungu' : data.return_num_of_docs(sigungu),
#                 'num_of_docs_in_sido_and_region' : data.return_average_num_of_docs(sigungu, data.return_region_class(sigungu)),
#                 'num_of_docs_average_in_region' : data.city_avg if data.return_region_class(sigungu) == '대도시' else data.countryside_avg
#             }
#         )

#     elif args['sido']:
#         sido = args['sido']
#         return jsonify(
#             status = 200,
#             result = {
#                 ''
#             }
#         )
#     else:
#         return jsonify(
#             status = 'failure',
#             result = 'please submit sido or sigungu name'
#         )

if __name__ == "__main__":
    app.run("0.0.0.0", port=5000)