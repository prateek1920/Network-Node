from bottle import route, run, request, post,template
from collections import OrderedDict
import json
import psycopg2
from truckpad.bottle.cors import CorsPlugin, enable_cors
import bottle

def cors(func):
    def wrapper(*args, **kwargs):
        bottle.response.set_header("Access-Control-Allow-Origin", "*")
        bottle.response.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        bottle.response.set_header("Access-Control-Allow-Headers", "Origin, Content-Type")   
        # skip the function if it is not needed
        if bottle.request.method == 'OPTIONS':
            return
        return func(*args, **kwargs)
    return wrapper

@route('/', method='get')
@cors
def db_connection():
    con = psycopg2.connect(
	host = "localhost",
	database = "postgres",
	user = "postgres",
	password = "postgres"
	)
    result1 = []
    result2 = []
    nodesinfo_headers = ['id', 'name', 'status', 'ip_address', 'x_coordinate', 'y_coordinate']
    interfacesinfo_headers = ['id','source', 'target']
    cur = con.cursor()

    nodesinfo_sql = 'SELECT * FROM nodes;'
    interfacesinfo_sql = 'SELECT * FROM interfaces;'
    print(nodesinfo_sql)
    cur.execute(nodesinfo_sql)
    nodesinfo_rows = cur.fetchall()
    con.commit()
    cur.execute(interfacesinfo_sql)
    interfacesinfo_rows = cur.fetchall()

    for row in nodesinfo_rows:
        row = OrderedDict(zip(nodesinfo_headers, row))
        result1.append(row)

    for row in interfacesinfo_rows:
        row = OrderedDict(zip(interfacesinfo_headers, row))
        result2.append(row)
    result = [result1, result2]

    print(result1, result2)
    return json.dumps(result)
    

run(host='localhost', port=8080, debug=True)