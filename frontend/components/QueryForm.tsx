'use client';

import React, { useState } from 'react';
import { apiClient } from '@/lib/api-client';

interface QueryFormProps {
  onAnalysisComplete: (report: string) => void;
}

export const QueryForm: React.FC<QueryFormProps> = ({ onAnalysisComplete }) => {
  const [query, setQuery] = useState('');
  const [segment, setSegment] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [segments, setSegments] = useState<string[]>([]);

  React.useEffect(() => {
    // Load available segments
    apiClient.getSegments().then(setSegments).catch((e) => console.error(e));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.analyze({
        query,
        segment: segment || undefined,
        timeframe: timeframe || undefined,
      });

      if (response.success) {
        onAnalysisComplete(response.final_report);
      } else {
        setError('Analysis failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Financial Query
        </label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Analyze Q4 performance for retail segment and identify key trends"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Segment (Optional)
          </label>
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a segment...</option>
            {segments.map((seg) => (
              <option key={seg} value={seg}>
                {seg.charAt(0).toUpperCase() + seg.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timeframe (Optional)
          </label>
          <input
            type="text"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            placeholder="e.g., Q4 2024, Last year"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
};
