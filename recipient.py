#!/usr/bin/env python
# coding: utf-8

# In[2]:


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings(action='ignore')
import platform
platform.system()

if platform.system() == 'Darwin': # Mac 환경 폰트 설정
    plt.rc('font', family='AppleGothic')
elif platform.system() == 'Windows': # Windows 환경 폰트 설정
    plt.rc('font', family='Malgun Gothic')
plt.rc('axes', unicode_minus=False) # 마이너스 폰트 설정

# 글씨 선명하게 출력하는 설정
get_ipython().run_line_magic('config', "InlineBackend.figure_format = 'retina'")


# In[3]:


recipient = pd.read_csv('recipient.csv', encoding = 'CP949')
del recipient['통계년월']
del recipient['수급가구수']
recipient['통계시도군구명'] = recipient['통계시도명'] + " " +recipient['통계시군구명']
del recipient['통계시도명']
del recipient['통계시군구명']
recipient = recipient[['통계시도군구명', '수급자구분', '수급자수']]
recipient = recipient.groupby(['통계시도군구명'], sort= False).sum()
recipient


# In[7]:


population = pd.read_csv('population.csv', encoding = 'CP949')
population['통계시도군구명'] = population['통계시도명'] + ' ' + population['통계시군구명']
population


# In[8]:


data = pd.merge(recipient, population, how = 'left', on = '통계시도군구명')
data = data[['통계시도명', '통계시군구명', '통계시도군구명', '수급자수', '인구수']]
data


# In[13]:


data['수급자 비율'] = data['수급자수']/data['인구수'] * 100
data.to_csv('recipient_percent.csv', encoding = 'CP949')
data


# In[189]:


sns.barplot(
    data = data_final,
    x = '통계시도명',
    y = '수급자 비율',
    hue = '구분'
)


# In[165]:


sns.barplot(
    data = data_final,
    x = '구분',
    y = '수급자 비율',
)
plt.ylim(4,6)

