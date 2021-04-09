import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import json
import scipy as sp
import platform
platform.system()

# plt.show() 한글 깨짐 방지
if platform.system() == 'Darwin': # Mac 환경 폰트 설정
    plt.rc('font', family='AppleGothic')
elif platform.system() == 'Windows': # Windows 환경 폰트 설정
    plt.rc('font', family='Malgun Gothic')

plt.rc('axes', unicode_minus=False) # 마이너스 폰트 설정

# 데이터 전처리
data = pd.read_excel('인구_천명당_의료기관_종사_의사수_시도_시_군_구.xls')
data['시도별'].fillna(method = 'ffill', inplace=True)
data['구분'].fillna('suburb', inplace=True)
data_for_calc = data[['시도별', '시군구별', '의료기관 종사 의사수', '주민등록인구', '구분']]

num_by_sido = data_for_calc.groupby(['시도별', '구분'], sort = False).sum()
num_by_sido['인구 천명당 의료기관 종사 의사수'] = num_by_sido['의료기관 종사 의사수']/num_by_sido['주민등록인구'] * 1000

num_by_sido = num_by_sido['인구 천명당 의료기관 종사 의사수']

# avg
avg = data_for_calc.groupby(['구분']).sum()
avg['인구 천명당 의료기관 종사 의사수'] = avg['의료기관 종사 의사수']/avg['주민등록인구'] * 1000

total_avg = avg['의료기관 종사 의사수'].sum()/avg['주민등록인구'].sum() * 1000
metro_avg = avg.loc['metro']['인구 천명당 의료기관 종사 의사수']
suburb_avg = avg.loc['suburb']['인구 천명당 의료기관 종사 의사수']

num_by_sido = num_by_sido.unstack(level = 1, fill_value = 0).reset_index(level = 0)

location_hash = {
    '경기': "경기도",
    '강원': "강원도",
    '충북': "충청북도",
    '충남': "충청남도",
    '전북': "전라북도",
    '전남': "전라남도",
    '경북': "경상북도",
    '경남': "경상남도",
    '제주': "제주특별자치도",
    '서울': "서울특별시",
    '부산': "부산광역시",
    '대구': "대구광역시",
    '인천': "인천광역시",
    '광주': "광주광역시",
    '대전': "대전광역시",
    '울산': "울산광역시",
    '세종': "세종특별자치시"
}



result_list_for_detail = []

for i in range(len(num_by_sido)):
    data = {
        'name': location_hash[num_by_sido.iloc[i]['시도별']],
        'metro': num_by_sido.iloc[i]['metro'],
        'suburb': num_by_sido.iloc[i]['suburb'],
        'total_avg': total_avg,
        'metro_avg': metro_avg,
        'suburb_avg': suburb_avg
    }

    result_list_for_detail.append(data)
    
num_of_doctors_data_for_detail = json.dumps(result_list_for_detail)


data_for_main = data_for_calc.groupby('시도별', sort=False).sum()
data_for_main['인구 천명당 의료기관 종사 의사수'] = data_for_main['의료기관 종사 의사수'] / data_for_main['주민등록인구'] * 1000
data_for_main['정규분포화'] = sp.stats.zscore(data_for_main['인구 천명당 의료기관 종사 의사수'])
data_for_main['밀도'] = sp.stats.norm.cdf(data_for_main['정규분포화'])
data_for_main['점수'] = (data_for_main['밀도']*100).astype(int)
data_for_main['전체 평균 대비'] = (data_for_main['점수'] - 50) * 2
data_for_main = data_for_main[['인구 천명당 의료기관 종사 의사수', '점수', '전체 평균 대비']]


result_list_for_main = []

for i in range(len(data_for_main)):
    data = {
        'name': location_hash[data_for_main.index[i]],
        'score': data_for_main.iloc[i]['점수'],
        'hover': data_for_main.iloc[i]['전체 평균 대비'],
    }

    result_list_for_main.append(data)

num_of_doctors_data_for_main = json.dumps(result_list_for_main)

print(num_of_doctors_data_for_detail)