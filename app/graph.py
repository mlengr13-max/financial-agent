from langgraph.graph import StateGraph
from langchain_openai import ChatOpenAI
from app.state import FinancialState
from app.tools.sql_tools import query_financials
from app.tools.document_tool import analyze_pdf, analyze_json
from app.tools.web_tool import market_research

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

def extract_segment(state: FinancialState):
    if "retail" in state["query"].lower():
        state["segment"] = "Retail"
    return state

def run_sql(state: FinancialState):
    query = f"""
        SELECT SUM(revenue) as total_revenue,
               SUM(cost) as total_cost
        FROM financials
        WHERE quarter='Q4' AND segment='{state["segment"]}'
    """
    state["sql_data"] = query_financials(query)
    return state

def run_documents(state: FinancialState):
    pdf_insights = analyze_pdf()
    json_insights = analyze_json()
    state["document_insights"] = pdf_insights + "\n" + json_insights
    return state

def run_market(state: FinancialState):
    state["market_insights"] = market_research("Q4 retail industry trends")
    return state

def synthesize(state: FinancialState):
    prompt = f"""
    User Query: {state["query"]}

    Financial Data:
    {state["sql_data"]}

    Document Insights:
    {state["document_insights"]}

    Market Insights:
    {state["market_insights"]}

    Generate an executive summary with trends, risks and recommendations.
    """
    state["final_report"] = llm.invoke(prompt).content
    return state

def build_graph():
    builder = StateGraph(FinancialState)

    builder.add_node("extract", extract_segment)
    builder.add_node("sql", run_sql)
    builder.add_node("docs", run_documents)
    builder.add_node("market", run_market)
    builder.add_node("synthesize", synthesize)

    builder.set_entry_point("extract")
    builder.add_edge("extract", "sql")
    builder.add_edge("sql", "docs")
    builder.add_edge("docs", "market")
    builder.add_edge("market", "synthesize")

    return builder.compile()