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
        existsQuery = "SELECT Id FROM Region WHERE Id = " + str(r)
        cursor.execute(existsQuery)
        record = cursor.fetchall()
        if len(record) == 0:
            Name = sheet.cell(r, 2).value
            Id = sheet.cell(r, 5).value
            values = (Id, Name)
            cursor.execute(query, values)

def insert_municipality(conn, cursor, municipality, r, sheet, mSheet, mrow_count, rSheet, rrow_count):
    regionCode = sheet.cell(r,3).value
    rName = ''
    for rr in range(1, rrow_count):
        rSheetRegionCode = rSheet.cell(rr, 0).value
        if rSheetRegionCode == regionCode:
            rName = rSheet.cell(rr, 2).value
            break
    find_region_id_query = "SELECT Id FROM Region WHERE Name = \'" + str(rName) + "\'"
    cursor.execute(find_region_id_query)
    region = cursor.fetchall()
    if len(region) != 0:
        regionId = region[0][0]
        for mr in range(1, mrow_count):
            mCode = mSheet.cell(mr, 0).value
            mId = ''
            if mCode == municipality:
                mId = mSheet.cell(mr, 5).value
                muni_withId_exists_query = "SELECT Id FROM Municipality WHERE Id = " + str(mId)
                cursor.execute(muni_withId_exists_query)
                muniWithIdData = cursor.fetchall()
                if len(muniWithIdData) == 0:
                    mName = mSheet.cell(mr, 2).value
                    create_municipality_query = "INSERT INTO Municipality(Id,Name,RegionId) VALUES(" + str(mId) + ", " + "'" +mName + "'"+", " + str(regionId) + ")"
                    print(create_municipality_query)
                    cursor.execute(create_municipality_query)


def insert_town(conn, cursor, r, sheet, mSheet, mrow_count, rSheet, rrow_count, townName, mName):
    townId = sheet.cell(r, 11).value
    regionCode = sheet.cell(r,3).value

    rName = ''
    for r in range(1, rrow_count):
        if rSheet.cell(r, 0).value == regionCode:
            rName = rSheet.cell(r, 2).value
            break

    find_region_id_query = "SELECT Id FROM Region WHERE Name = \'" + str(rName) + "\'"
    cursor.execute(find_region_id_query)
    region = cursor.fetchall()
    if len(region) != 0:
        regionId = region[0][0]
        find_municipality_id_query = "SELECT Id FROM Municipality WHERE Name = \'" + str(mName) + "\'"
        cursor.execute(find_municipality_id_query)
        municipality = cursor.fetchall()
        if len(municipality) != 0:
            municipalityId = municipality[0][0]
            values = str(townId) + ", " + "'"  + str(townName) + "'"  + ", " + str(municipalityId)
            insert_town_query = "INSERT INTO Town (Id, Name, MunicipalityId) VALUES(" + values + ")"
            cursor.execute(insert_town_query)


def insert_municipalities_and_towns(conn, cursor):

    fullDataDirectory = "/home/borislav/Downloads/EKATTE/Ekatte_xlsx/Ek_atte.xlsx"
    fullDataSheet = "Ek_atte"

    municipalitiesDirectory = "/home/borislav/Downloads/EKATTE/Ekatte_xlsx/Ek_obst.xlsx"
    municipalitiesSheet = "Ek_obst"

    regionsDirectory = "/home/borislav/Downloads/EKATTE/Ekatte_xlsx/Ek_obl.xlsx"
    regionsSheet = "Ek_obl"

    data = xlrd.open_workbook(fullDataDirectory)
    sheet = data.sheet_by_name(fullDataSheet)

    municipalitiesData = xlrd.open_workbook(municipalitiesDirectory)
    mSheet = municipalitiesData.sheet_by_name(municipalitiesSheet)

    regions = xlrd.open_workbook(regionsDirectory)
    rSheet = regions.sheet_by_name(regionsSheet)

    row_count = sheet.nrows
    mrow_count = mSheet.nrows
    rrow_count = rSheet.nrows

    for r in range(1, row_count):
        municipality = sheet.cell(r, 4).value
        muni_exists_query = "SELECT Name FROM Municipality WHERE Name = \'" + municipality + "\'"
        cursor.execute(muni_exists_query)
        municipalityRecord = cursor.fetchall()
        if len(municipalityRecord) == 0:
            insert_municipality(conn, cursor, municipality, r, sheet, mSheet, mrow_count, rSheet, rrow_count)
        townName = sheet.cell(r, 2).value
        municipalityCode = sheet.cell(r,4).value
        mName = ''
        for mr in range(1, mrow_count):
            if mSheet.cell(mr, 0).value == municipalityCode:
                mName = mSheet.cell(mr, 2).value
                break
        town_exists_query = "SELECT * FROM Town AS t JOIN Municipality AS m ON t.MunicipalityId = m.Id WHERE t.Name = \'" + townName + "'" + "AND m.Name = \'" + mName   + "'"
        cursor.execute(town_exists_query)
        townRecord = cursor.fetchall()
        if len(townRecord) == 0:
            insert_town(conn, cursor, r, sheet, mSheet, mrow_count, rSheet, rrow_count, townName, mName)

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
