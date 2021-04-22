#!/usr/bin/env python3
import pandas as pd
import psycopg2
import xlrd
from flask import Flask, json, request
from flask_cors import CORS

dbName = "bulgaria"
dbUSer = "postgres"

conn = psycopg2.connect(
    host="localhost",
    database=dbName,
    user=dbUSer,
    password="028563513a")

cursor = conn.cursor()

api = Flask(__name__)
CORS(api)
@api.route('/getTowns', methods=['GET'])
def get_companies():
  name = request.args.get('name')
  query = 'SELECT t.Id, t.Name, m.Name, r.Name FROM Town AS t JOIN Municipality AS m ON t.MunicipalityId = m.Id JOIN Region AS r ON r.Id = m.RegionId WHERE t.Name LIKE \'' + str(name) + "%\'"
  cursor.execute(query)

  result = cursor.fetchall()

  finalResult = []
  for item in result:
    jsonResult = {"Id": item[0], "Name" : item[1], "mName" : item[2], "rName" : item[3]}
    finalResult.append(jsonResult)
  return json.dumps(finalResult, ensure_ascii=False).encode('utf8').decode()


if __name__ == '__main__':
  api.run()