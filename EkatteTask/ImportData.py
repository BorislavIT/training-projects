#!/usr/bin/env python3
import pandas as pd
import psycopg2
import xlrd

dbName = "bulgaria"
dbUSer = "postgres"

conn = psycopg2.connect(
    host="localhost",
    database=dbName,
    user=dbUSer,
    password="028563513a")

cursor = conn.cursor()


def insert_regions(conn, cursor):
    regionsDirectory = "/home/borislav/Downloads/EKATTE/Ekatte_xlsx/Ek_obl.xlsx"
    regionsSheet = "Ek_obl"

    regions = xlrd.open_workbook(regionsDirectory)
    sheet = regions.sheet_by_name(regionsSheet)

    row_count = sheet.nrows

    query = """INSERT INTO Region (Id, Name) VALUES (%s, %s)"""

    for r in range(1, row_count):
        Id = sheet.cell(r, 0).value
        existsQuery = "SELECT Id FROM Region WHERE Id = " + "\'"+ str(Id) + "\'"
        cursor.execute(existsQuery)
        record = cursor.fetchall()
        if len(record) == 0:
            Name = sheet.cell(r, 2).value
            values = (Id, Name)
            cursor.execute(query, values)

def insert_municipality(conn, cursor, municipality, r, sheet, mSheet, mrow_count):
    regionCode = sheet.cell(r,3).value
    if regionCode == "":
        return
    find_region_id_query = "SELECT Id FROM Region WHERE Id = \'" + str(regionCode) + "\'"
    print(find_region_id_query)
    cursor.execute(find_region_id_query)
    region = cursor.fetchall()
    if len(region) != 0:
        regionId = region[0][0]
        for mr in range(1, mrow_count):
            mCode = mSheet.cell(mr, 0).value
            if mCode == municipality:
                muni_withId_exists_query = "SELECT Id FROM Municipality WHERE Id = \'" + str(mCode) + "\'"
                cursor.execute(muni_withId_exists_query)
                muniWithIdData = cursor.fetchall()
                if len(muniWithIdData) == 0:
                    mName = mSheet.cell(mr, 2).value
                    create_municipality_query = "INSERT INTO Municipality(Id,Name,RegionId) VALUES(" + "\'"+ str(mCode) + "\'" + ", " + "'" +mName + "'" +", \'"+ str(regionCode) + "\'" ")"
                    print(create_municipality_query)
                    cursor.execute(create_municipality_query)


def insert_town(conn, cursor, r, sheet, townName, municipalityId):
    townId = sheet.cell(r, 0).value
    regionCode = sheet.cell(r,3).value

    find_region_id_query = "SELECT Id FROM Region WHERE Id = \'" + str(regionCode) + "\'"
    cursor.execute(find_region_id_query)
    region = cursor.fetchall()
    if len(region) != 0:
        regionId = region[0][0]
        find_municipality_id_query = "SELECT Id FROM Municipality WHERE Id = \'" + str(municipalityId) + "\'"
        cursor.execute(find_municipality_id_query)
        municipality = cursor.fetchall()
        if len(municipality) != 0:
            values = "\'" + str(townId) + "\'" + ", " + "'"  + str(townName) + "'"  + ", \'" + str(municipalityId) + "\'"
            insert_town_query = "INSERT INTO Town (Id, Name, MunicipalityId) VALUES(" + values + ")"
            cursor.execute(insert_town_query)


def insert_municipalities_and_towns(conn, cursor):

    fullDataDirectory = "/home/borislav/Downloads/EKATTE/Ekatte_xlsx/Ek_atte.xlsx"
    fullDataSheet = "Ek_atte"

    municipalitiesDirectory = "/home/borislav/Downloads/EKATTE/Ekatte_xlsx/Ek_obst.xlsx"
    municipalitiesSheet = "Ek_obst"

    municipalitiesData = xlrd.open_workbook(municipalitiesDirectory)
    mSheet = municipalitiesData.sheet_by_name(municipalitiesSheet)

    mrow_count = mSheet.nrows

    data = xlrd.open_workbook(fullDataDirectory)
    sheet = data.sheet_by_name(fullDataSheet)

    row_count = sheet.nrows

    for r in range(1, row_count):
        municipalityId = sheet.cell(r, 4).value
        muni_exists_query = "SELECT Id FROM Municipality WHERE Id = \'" + municipalityId + "\'"
        cursor.execute(muni_exists_query)
        municipalityRecord = cursor.fetchall()
        if len(municipalityRecord) == 0:
            insert_municipality(conn, cursor, municipalityId, r, sheet, mSheet, mrow_count)
        townName = sheet.cell(r, 2).value
        mName = ''
        for mr in range(1, mrow_count):
            if mSheet.cell(mr, 0).value == municipalityId:
                mName = mSheet.cell(mr, 2).value
                break
        town_exists_query = "SELECT * FROM Town AS t JOIN Municipality AS m ON t.MunicipalityId = m.Id WHERE t.Name = \'" + townName + "'" + "AND m.Id = \'" + municipalityId   + "'"
        cursor.execute(town_exists_query)
        townRecord = cursor.fetchall()
        if len(townRecord) == 0:
            insert_town(conn, cursor, r, sheet, townName, municipalityId)

def find_count_of_towns(conn, cursor):
    query = "SELECT COUNT(Id) AS C FROM Town"
    cursor.execute(query)
    count = cursor.fetchall()
    print("Count of towns: ", count[0][0])

def find_count_of_municipalities(conn, cursor):
    query = "SELECT COUNT(Id) AS C FROM Municipality"
    cursor.execute(query)
    count = cursor.fetchall()
    print("Count of municipalities: ", count[0][0])

def find_count_of_regions(conn, cursor):
    query = "SELECT COUNT(Id) AS C FROM Region"
    cursor.execute(query)
    count = cursor.fetchall()
    print("Count of regions: ", count[0][0])

insert_regions(conn, cursor)
insert_municipalities_and_towns(conn, cursor)

find_count_of_towns(conn, cursor)
find_count_of_regions(conn, cursor)
find_count_of_municipalities(conn, cursor)


cursor.close()

conn.commit()

conn.close()
