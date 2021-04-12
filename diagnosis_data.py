import numpy as np
import pandas as pd
import json

metro = ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시']
suburb = ['경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주특별자치도']
every_city = metro + suburb

diagnosis_count = [27389124, 16290268, 11601942, 9977040, 6664592, 5792736, 2050914, 433194, 24783488, 
                    5652890, 5089596, 6185056, 10143696, 8430088, 10521864, 10014392, 2125646]
diagnosis_percent = [2.82, 4.77, 4.76, 3.37, 4.58, 3.93, 1.79, 1.27, 1.87, 3.67, 3.18, 2.91, 5.58, 4.51, 3.95, 2.98, 3.17]
diagnosis_score = [28, 87, 87, 46, 83, 65, 6, 2, 7, 56, 39, 30, 96, 81, 66, 33, 39]
diagnosis_hover = [-44, 74, 74, -8, 66, 30, -88, -96, -86, 12, -22, -40, 92, 62, 32, -34, -22]

metro_count_avg = 10024976.25
suburb_count_avg = 9216301.78
total_count_avg = 9596854.47
metro_percent_avg = 14.48
suburb_percent_avg = 14.05
total_percent_avg = 15.41
metro_score_avg = 1
suburb_score_avg = -4.25
total_score_avg = 0.12

result_main = []

result_detail = []
with open('diagnosis_count.json') as file:
    json_string = file.read()    
    diagnosis_detail = json.loads(json_string)

for i in diagnosis_detail:
    i['type'] = 'count'
    result_detail.append(i)

with open('diagnosis_percent.json') as file:
    json_string = file.read()    
    diagnosis_detail = json.loads(json_string)

for i in diagnosis_detail:
    i['type'] = 'percent'
    result_detail.append(i)

with open('diagnosis_score.json') as file:
    json_string = file.read()    
    diagnosis_detail = json.loads(json_string)

for i in diagnosis_detail:
    i['type'] = 'score'
    result_detail.append(i)

#print(result_detail)
with open('diagnosis_detail.json', 'w') as dst:
     jsonified = json.dumps(result_detail)
     dst.write(jsonified)