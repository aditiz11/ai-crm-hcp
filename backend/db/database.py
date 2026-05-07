import sqlite3

DB_NAME = "crm.db"

def get_connection():

    conn = sqlite3.connect(DB_NAME)

    return conn

def init_db():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""

    CREATE TABLE IF NOT EXISTS interactions (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        hcp_name TEXT,
        date TEXT,
        sentiment TEXT,
        product TEXT,
        brochure_shared BOOLEAN,
        summary TEXT,
        follow_up TEXT,
        raw_text TEXT

    )

    """)

    conn.commit()

    conn.close()