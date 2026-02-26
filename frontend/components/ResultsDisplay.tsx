'use client';

import React from 'react';

interface ResultsDisplayProps {
  report: string;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ report }) => {
  if (!report) {
    return null;
  }

  // Simple markdown rendering
  const formatReport = (text: string) => {
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('###')) {
        return (
          <h3 key={idx} className="text-lg font-bold mt-4 mb-2 text-gray-900">
            {line.replace(/^###\s*/, '')}
          </h3>
        );
      }
      if (line.startsWith('##')) {
        return (
          <h2 key={idx} className="text-2xl font-bold mt-6 mb-3 text-gray-900">
            {line.replace(/^##\s*/, '')}
          </h2>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={idx} className="font-semibold text-gray-800 my-2">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      }
      if (line.startsWith('-')) {
        return (
          <li key={idx} className="ml-6 text-gray-700">
            {line.replace(/^-\s*/, '')}
          </li>
        );
      }
      if (line.startsWith('1.')) {
        return (
          <li key={idx} className="ml-6 text-gray-700 list-decimal">
            {line.replace(/^[0-9]+\.\s*/, '')}
          </li>
        );
      }
      if (line.trim() === '') {
        return <br key={idx} />;
      }
      return (
        <p key={idx} className="text-gray-700 my-2">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
      <div className="prose prose-sm max-w-none">
        {formatReport(report)}
      </div>
      <button
        onClick={() => {
          const element = document.createElement('a');
          element.setAttribute(
            'href',
            'data:text/plain;charset=utf-8,' + encodeURIComponent(report)
          );
          element.setAttribute('download', 'analysis-report.txt');
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        }}
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
      >
        Download Report
      </button>
    </div>
  );
};
