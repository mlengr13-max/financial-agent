import duckdb
import pandas as pd

DB_PATH = "data/warehouse.db"

def initialize_db():
    conn = duckdb.connect(DB_PATH)
    df = pd.read_csv("data/financials.csv")
    conn.execute("CREATE TABLE IF NOT EXISTS financials AS SELECT * FROM df")
    conn.close()

def query_financials(query: str):
    conn = duckdb.connect(DB_PATH)
    result = conn.execute(query).fetchdf()
    conn.close()
    return result.to_markdown()