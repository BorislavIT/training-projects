import PySimpleGUI as sg
import psycopg2
import pandas as pd

dbName = "bulgaria"
dbUSer = "postgres"

conn = psycopg2.connect(
    host="localhost",
    database=dbName,
    user=dbUSer,
    password="028563513a")

cursor = conn.cursor()

names = []

query = 'SELECT * FROM Town'

cursor.execute(query)

result = cursor.fetchall()

if len(result) != 0:
    for t in result:
        name = t[1]
        names.append(name)
        
layout = [  [sg.Text('Listbox with search')],
            [sg.Input(do_not_clear=True, size=(200,10),enable_events=True, key='_INPUT_')],
            [sg.Listbox(names, size=(200,40), enable_events=True, key='_LIST_')],
            [sg.Button('Exit')]]

window = sg.Window('Listbox with Search').Layout(layout)
# Event Loop
while True:
    event, values = window.Read()
    if event is None or event == 'Exit':                # always check for closed window
        break
    if values['_INPUT_'] != '':                         # if a keystroke entered in search field
        search = values['_INPUT_']
        new_values = [x for x in names if search in x]  # do the filtering
        window.Element('_LIST_').Update(new_values)     # display in the listbox
    else:
        window.Element('_LIST_').Update(names)          # display original unfiltered list
    if event == '_LIST_' and len(values['_LIST_']):     # if a list item is chosen
        sg.Popup('Selected ', values['_LIST_'])

window.Close()