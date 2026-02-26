from dotenv import load_dotenv
from app.graph import build_graph
from app.tools.sql_tools import initialize_db
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

load_dotenv()
initialize_db()

graph = build_graph()

result = graph.invoke({
    "query": "Analyze Q4 performance for retail segment and identify key trends"
})

print("\n=== FINAL REPORT ===\n")
print(result["final_report"])