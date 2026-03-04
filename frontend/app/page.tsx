'use client';

import React, { useState, useRef } from 'react';
import { QueryForm } from '@/components/QueryForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { ExampleQueries } from '@/components/ExampleQueries';

export default function Home() {
  const [report, setReport] = useState('');
  const [queryValue, setQueryValue] = useState('');
  const queryFormRef = useRef<{ submit: () => Promise<void> }>(null);

  const handleSelectQuery = (query: string) => {
    setQueryValue(query);
    // Auto-submit after a short delay to ensure state is updated
    setTimeout(() => {
      queryFormRef.current?.submit();
    }, 100);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Financial Agent</h1>
          <p className="text-blue-100">
            AI-powered financial analysis and market research platform
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Example Queries */}
        <ExampleQueries onSelectQuery={handleSelectQuery} />

        {/* Query Form */}
        <QueryForm ref={queryFormRef} queryValue={queryValue} onAnalysisComplete={setReport} />

        {/* Results */}
        {report && <ResultsDisplay report={report} />}

        {!report && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Submit a query above to get started with financial analysis
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p>© 2024 Financial Agent. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
