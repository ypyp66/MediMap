import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import json

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

result_list = []
for i in range(len(num_by_sido)):
    data = {
        'name': num_by_sido.iloc[i]['시도별'],
        'metro': num_by_sido.iloc[i]['metro'],
        'suburb': num_by_sido.iloc[i]['suburb'],
    }
    result_list.append(data)

num_of_doctors = json.dumps(result_list)

print(num_of_doctors)