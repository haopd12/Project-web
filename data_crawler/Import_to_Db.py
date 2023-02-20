import sqlite3 
def Insert_Novel(novel_info = [],connection=""):
    cursor = connection.cursor()
    columns = ['NID', 'Poster', 'Theme']
    for row in novel_info:
        keys = tuple(row[c] for c in columns)
        cursor.execute("insert into Novel values(?,?,?)", keys) 
    
def Insert_Chapter(chapter_info = [],connection=""):
    cursor = connection.cursor()
    columns = ['CID', 'Content', 'Page']
    for row in chapter_info:
        keys = tuple(row[c] for c in columns)
        cursor.execute("insert into Chapter values(?,?,?)", keys) 

def Insert_Novel_Chapter(foreign_base = [], connection = ""):
    cursor = connection.cursor()
    columns = ['NID','CID']
    for row in foreign_base:
        keys = tuple(row[c] for c in columns)
        cursor.execute("insert into Novel_Chapter values(?,?)", keys) 
        

    