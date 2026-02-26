'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

interface ExampleQueriesProps {
  onSelectQuery: (query: string) => void;
}

export const ExampleQueries: React.FC<ExampleQueriesProps> = ({ onSelectQuery }) => {
  const [examples, setExamples] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .getQueryExamples()
      .then(setExamples)
      .catch((e) => console.error('Failed to load examples:', e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-gray-600">Loading example queries...</p>
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
