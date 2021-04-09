import json

with open('./json_files_for_main/doctor.json') as json_file:
    doctor_data = json.load(json_file)

with open('./json_files_for_main/hospital.json') as json_file:
    hospital_data = json.load(json_file)

with open('./json_files_for_main/ambul_medic.json') as json_file:
    ambul_medic_data = json.load(json_file)

data_for_main = [doctor_data, hospital_data, ambul_medic_data]

def sido_info(sido):
    for i in range(17):
        for j in range(len(dat_for_main)):
            