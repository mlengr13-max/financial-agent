from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.graph import build_graph
from app.tools.sql_tools import initialize_db

router = APIRouter()

# Initialize database on startup
initialize_db()

class AnalysisRequest(BaseModel):
    """Request model for financial analysis"""
    query: str
    segment: Optional[str] = None
    timeframe: Optional[str] = None

class AnalysisResponse(BaseModel):
    """Response model for financial analysis"""
    query: str
    final_report: str
    success: bool

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_financial_data(request: AnalysisRequest):
    """
    Analyze financial data based on the provided query.
    
    Args:
        request: Analysis request with query and optional filters
        
    Returns:
        AnalysisResponse with the financial analysis report
    """
    try:
        # Build and invoke the graph
        graph = build_graph()
        result = graph.invoke({
            "query": request.query,
            "segment": request.segment,
            "timeframe": request.timeframe
        })
        
        return AnalysisResponse(
            query=request.query,
            final_report=result.get("final_report", ""),
            success=True
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )

@router.get("/query-examples")
def get_query_examples():
    """Get example queries for guidance"""
    examples = [
        "Analyze Q4 performance for retail segment and identify key trends",
        "What are the revenue trends for the electronics segment over the past year?",
        "Compare gross margin performance across all segments",
        "Identify growth opportunities in the Asia-Pacific region",
        "Assess operational efficiency improvements in logistics"
    ]
    return {"examples": examples}

@router.get("/segments")
def get_available_segments():
    """Get available business segments"""
    segments = [
        "retail",
        "electronics", 
        "apparel",
        "home_goods",
        "overall"
    ]
    return {"segments": segments}
