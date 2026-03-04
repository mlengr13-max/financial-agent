'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

interface ExampleQueriesProps {
  onSelectQuery: (query: string) => void;
}

export const ExampleQueries: React.FC<ExampleQueriesProps> = ({ onSelectQuery }) => {
  const [examples, setExamples] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExamples = async () => {
      try {
        setError(null);
        const data = await apiClient.getQueryExamples();
        setExamples(data);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load example queries';
        console.error('Failed to load examples:', err);
        setError(errorMsg);
        setExamples([]);
      } finally {
        setLoading(false);
      }
    };

    loadExamples();
  }, []);

  if (loading) {
    return (
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-gray-600">Loading example queries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg p-4 mb-6">
        <p className="text-red-700 font-medium">Error Loading Examples</p>
        <p className="text-sm text-red-600 mt-1">{error}</p>
        <p className="text-xs text-red-500 mt-2">Make sure the backend API is running on port 8000</p>
      </div>
    );
  }

  if (examples.length === 0) {
    return (
      <div className="bg-yellow-50 rounded-lg p-4 mb-6">
        <p className="text-yellow-700">No example queries available</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-gray-900 mb-3">Example Queries</h3>
      <div className="space-y-2">
        {examples.map((example, idx) => (
          <button
            key={idx}
            onClick={() => onSelectQuery(example)}
            className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded hover:bg-blue-100 transition-colors"
          >
            <p className="text-sm text-gray-800">{example}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
