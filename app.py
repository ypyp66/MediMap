import json

#이번주에 본 파일을 다른 분들과 통합하여 API를 만들어야 함.

#전체병원수를 기준으로 한 지역별 병원당 인구 커버 수를 json으로 주피터에서 만들어 import
with open('total_hospital.json') as file:
    json_string = file.read()    
    total_hospital = json.loads(json_string)

with open('total_hospital_avg.json') as file:
    json_string = file.read()    
    total_hospital_avg = json.loads(json_string)

print("전체 병원 기준: ", total_hospital)
print("전체 병원 기준: ", total_hospital_avg)
print("\n")

#종합병원수를 기준으로 한 지역별 병원당 인구 커버 수를 json으로 주피터에서 만들어 import
with open('general_hospital.json') as file:
    json_string = file.read()    
    gen_hospital = json.loads(json_string)

with open('general_hospital_avg.json') as file:
    json_string = file.read()    
    gen_hospital_avg = json.loads(json_string)

print("종합병원 기준: ", gen_hospital)
print("종합병원 기준: ", gen_hospital_avg)
print("\n")

#일반 병원수를 기준으로 한 지역별 병원당 인구 커버 수를 json으로 주피터에서 만들어 import
with open('medium_hospital.json') as file:
    json_string = file.read()    
    medium_hospital = json.loads(json_string)

with open('medium_hospital_avg.json') as file:
    json_string = file.read()    
    medium_hospital_avg = json.loads(json_string)

print("병원 기준: ", medium_hospital)
print("병원 기준: ", medium_hospital_avg)
print("\n")

#의원수를 기준으로 한 지역별 병원당 인구 커버 수를 json으로 주피터에서 만들어 import
with open('small_hospital.json') as file:
    json_string = file.read()    
    small_hospital = json.loads(json_string)

with open('small_hospital_avg.json') as file:
    json_string = file.read()    
    small_hospital_avg = json.loads(json_string)

print("의원 기준: ", small_hospital)
print("의원 기준: ", small_hospital_avg)
