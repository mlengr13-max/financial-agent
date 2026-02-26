from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
import json

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

def analyze_pdf():
    try:
        loader = PyPDFLoader("data/q4_report.pdf")
        docs = loader.load()
        if not docs:
            return "No PDF content available"
        content = "\n".join([d.page_content for d in docs])

        prompt = ChatPromptTemplate.from_template(
            "Extract key Q4 retail segment insights:\n{content}"
        )
        return llm.invoke(prompt.format(content=content)).content
    except Exception as e:
        return f"PDF analysis not available: {str(e)}"


def analyze_json():
    try:
        with open("data/earnings.json") as f:
            content = f.read().strip()
            if not content:
                return "No earnings data available"
            data = json.loads(content)

        prompt = ChatPromptTemplate.from_template(
            "Summarize key commentary about retail performance:\n{content}"
        )
        return llm.invoke(prompt.format(content=str(data))).content
    except Exception as e:
        return f"Earnings analysis not available: {str(e)}"