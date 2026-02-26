from typing import TypedDict, Optional

class FinancialState(TypedDict):
    query: str
    segment: Optional[str]
    sql_data: Optional[str]
    document_insights: Optional[str]
    market_insights: Optional[str]
    final_report: Optional[str]