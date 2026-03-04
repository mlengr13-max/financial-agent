# Financial Agent

An AI-powered full-stack financial analysis platform that leverages LangGraph, LangChain, FastAPI, and Next.js to analyze quarterly financial performance, extract insights from documents, and provide market research with executive summaries.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Backend:** Python 3.11 or higher, pip (Python package manager)
- **Frontend:** Node.js 16+ and npm/yarn
- **General:** git

## Project Structure

```
financial-agent/
├── README.md                    # Project documentation
├── requirements.txt             # Python backend dependencies
├── .gitignore                   # Git ignore rules
├── app/                         # Python backend (LangGraph/LangChain)
│   ├── __init__.py
│   ├── main.py                 # CLI entry point
│   ├── graph.py                # LangGraph workflow definition
│   ├── state.py                # State management
│   └── tools/
│       ├── __init__.py
│       ├── sql_tools.py        # Database query tools
│       ├── document_tool.py    # PDF and JSON analysis
│       └── web_tool.py         # Web search functionality
├── backend/                     # FastAPI REST API
│   ├── __init__.py
│   ├── server.py               # Main FastAPI application
│   └── api/
│       ├── __init__.py
│       └── routes.py           # API endpoints
├── frontend/                    # Next.js React frontend
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/             # React components
│   │   ├── QueryForm.tsx
│   │   ├── ResultsDisplay.tsx
│   │   └── ExampleQueries.tsx
│   ├── lib/
│   │   └── api-client.ts       # API client service
│   └── styles/
│       └── globals.css
├── data/
│   ├── earnings.json           # Earnings data
│   └── financials.csv          # Financial data
└── venv/                       # Python virtual environment (created locally)
```

## Installation & Setup

### Backend Setup

#### 1. Create and Activate Virtual Environment

**macOS/Linux:**
```bash
python -m venv venv
source venv/bin/activate
```

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

#### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

#### 3. Create `.env` File

Create a `.env` file in the project root with your API keys:

```bash
OPENAI_API_KEY=your_openai_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

Get API keys from:
- [OpenAI](https://platform.openai.com/api-keys)
- [Tavily](https://tavily.com)

### Frontend Setup

#### 1. Navigate to Frontend Directory

```bash
cd frontend
```

#### 2. Install Node Dependencies

```bash
npm install
# or
yarn install
```

#### 3. Configure Environment

Create `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Running the Application

### Option 1: Run Backend CLI (Standalone)

```bash
PYTHONPATH=. python app/main.py
```

### Option 2: Run Full Stack (Recommended)

**Terminal 1 - Backend API:**
```bash
source venv/bin/activate  # or appropriate activation for your OS
python backend/server.py
```

The API will be available at `http://localhost:8000`
- Swagger docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### POST `/api/analyze`
Analyze financial data based on query

**Request:**
```json
{
  "query": "Analyze Q4 performance for retail segment",
  "segment": "retail",
  "timeframe": "Q4 2024"
}
```

**Response:**
```json
{
  "query": "Analyze Q4 performance for retail segment",
  "final_report": "...",
  "success": true
}
```

### GET `/api/query-examples`
Get example queries

### GET `/api/segments`
Get available business segments

### GET `/health`
Health check endpoint

## How It Works

The financial agent follows this workflow:

1. **User Input** - Submit a financial query through the web UI using:
   - Manual query entry in the text field
   - **Example Queries** - Click any example query to auto-fill and auto-analyze
2. **Extract Segment** - Identifies the financial segment from the query
3. **SQL Query** - Retrieves financial data from DuckDB database
4. **Document Analysis** - Extracts insights from JSON earnings data
5. **Market Research** - Gathers market trends using web search (Tavily)
6. **Synthesize** - LLM generates executive summary with trends, risks, and recommendations
7. **Display Results** - Shows comprehensive analysis report

### Example Queries Feature
Click on any example query in the "Example Queries" section to automatically:
- Fill the query text field
- Trigger analysis immediately
- Display results in the report section

## Development

### Backend Development

**Run tests:**
```bash
pytest tests/
```

**Format code:**
```bash
black app/ backend/
```

**Lint:**
```bash
pylint app/ backend/
```

### Frontend Development

**Run development server:**
```bash
cd frontend
npm run dev
```

**Build for production:**
```bash
npm run build
npm start
```

**Lint:**
```bash
npm run lint
```

## Troubleshooting

### Backend Issues

**ModuleNotFoundError: No module named 'dotenv'**
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt`

**CORS errors from frontend**
- Verify `NEXT_PUBLIC_API_URL` in `frontend/.env.local` matches backend URL
- Check backend CORS configuration in `backend/server.py`

**OpenAI API errors**
- Verify `OPENAI_API_KEY` is set correctly in `.env`
- Check that your OpenAI account has available credits

### Frontend Issues

**Example queries not loading**
- Ensure backend server is running on port 8000
- Check browser console for API connection errors
- Verify `NEXT_PUBLIC_API_URL=http://localhost:8000` in `frontend/.env.local`
- Backend should respond to: `curl http://localhost:8000/api/query-examples`

**Cannot reach backend API**
- Ensure backend server is running on port 8000
- Check `NEXT_PUBLIC_API_URL` configuration
- Verify CORS headers in browser network tab

**Next.js build errors**
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Deployment

### Backend (Heroku/Railway/AWS)

```bash
# Create Procfile
web: gunicorn backend.server:app

# Add gunicorn to requirements.txt
```

### Frontend (Vercel/Netlify)

```bash
# Deploy through Vercel CLI
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Technologies

- **Backend:**
  - FastAPI - Modern Python web framework
  - LangChain - LLM orchestration
  - LangGraph - Workflow graphs
  - DuckDB - Lightweight SQL database
  - Pydantic - Data validation

- **Frontend:**
  - Next.js 16 - React framework
  - TypeScript - Type safety
  - Tailwind CSS v4 - Styling
  - Axios - HTTP client

## Recent Improvements

- **Interactive Example Queries** - Click any example query to auto-fill and auto-analyze
- **Enhanced Error Handling** - Better error messages for frontend API connection issues
- **Security Updates** - All npm vulnerabilities resolved (glob, marked packages)
- **Tailwind CSS v4** - Updated to latest Tailwind CSS with improved PostCSS integration
- **Improved TypeScript Types** - Better type safety in React components

## License

This project is licensed under the MIT License - see the LICENSE file for details.
