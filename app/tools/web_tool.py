from tavily import TavilyClient
import os

client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

def market_research(query: str):
    results = client.search(query=query, max_results=3)
    summaries = "\n".join([r["content"] for r in results["results"]])
    return summaries