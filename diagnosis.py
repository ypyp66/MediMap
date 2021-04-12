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


# In[5]:


heal = pd.read_csv('healcount.csv')
heal


# In[6]:


healcount = heal['진료형태'] == '계'
heal = heal[healcount]
healcount = heal['시도'] != '전국'
heal = heal[healcount]
heal = heal.groupby(['시도']).sum()
del heal['종별']
#heal.to_csv('heal.csv', encoding = 'CP949')
heal


# In[ ]:





# In[19]:


heal = pd.read_csv('heal.csv', encoding = 'CP949')
heal = heal.sort_values(by = '구분')
heal


# In[20]:


plt.xticks(rotation = 45 )
sns.barplot(
    data = heal,
    x = '통계시도명',
    y = '진료실인원/인구수',
    hue = '구분'
)


# In[22]:


plt.xticks(rotation = 45 )
sns.barplot(
    data = heal,
    x = '통계시도명',
    y = '진료건수/인구수',
    hue = '구분'

)

