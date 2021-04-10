from flask import Flask, request, render_template, redirect, url_for
import json

app = Flask(__name__)

@app.route('/<region>', methods=["GET"])
def region():
    return "원하시는 지표를 클릭하시기 바랍니다."

@app.route('/<region>/hospital', methods=["GET", "ㅖPST"])
def hospital():
    return json 

@app.route('/<region>/hospital', methods=["GET"])
def hospital():
    return json 


# if __name__ == '__main__':
#     app.run('0.0.0.0', port=80)


