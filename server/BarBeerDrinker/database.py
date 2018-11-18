from sqlalchemy import create_engine
from sqlalchemy import sql

from BarBeerDrinker import config

engine = create_engine(config.database_uri)

def get_bars():
    #connects to db and gets bars and info
    with engine.connect() as con:
        rs = con.execute('SELECT name, license, city, phone, address FROM bars;')
        return [dict(row) for row in rs]

def find_bar(name):
    with engine.connect() as con:
        query = sql.text(
            'SELECT name, license, city, phone, address FROM bars WHERE name = :name;'
        )

        rs = con.execute(query, name=name)
        result = rs.first()
        if result is None:
            return None
        return dict(result)

def filter_beers(max_price):
    with engine.connect() as con:
        query = sql.text(
            'SELECT * FROM sells WHERE price < :max_price;'
        )

        rs = con.execute(query, max_price=max_price)
        results = [dict(row) for row in rs]
        for r in results:
            r['price'] = float(r['price'])
        return results

def get_bar_frequent_counts():
    with engine.connect() as con:
        query = sql.text('SELECT bar, count(*) as frequentCount \
            FROM frequents \
            GROUP BY bar; \
        ')
        rs = con.execute(query)
        results = [dict(row) for row in rs]
        return results

def get_bar_menu(bar_name):
    with engine.connect() as con:
        query = sql.text(
            'SELECT a.bar, a.item, a.price, b.manf \
                FROM sells as a \
                JOIN items as b \
                ON a.item = b.name \
                WHERE a.bar = :bar; \
        ')
        
        rs = con.execute(query, bar=bar_name)
        results = [dict(row) for row in rs]
        for i, _ in enumerate(results):
            results[i]['price'] = float(results[i]['price'])
        return results
