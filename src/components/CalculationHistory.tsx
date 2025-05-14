import { useState } from 'react';
import { Clock, Trash2, Package, Search } from 'lucide-react';
import { HistoryItemType } from '../types';

interface CalculationHistoryProps {
  history: HistoryItemType[];
  onLoadCalculation: (item: HistoryItemType) => void;
  onDeleteCalculation: (id: number) => void;
}

export const CalculationHistory = ({
  history,
  onLoadCalculation,
  onDeleteCalculation
}: CalculationHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const filteredHistory = searchTerm.trim() === ''
    ? history
    : history.filter(item => 
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        formatDate(item.date).toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Clock className="mr-2 text-blue-600 dark:text-blue-400" size={22} />
          Calculation History
        </h2>

        <div className="mt-3 sm:mt-0 relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-200">No calculations saved</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Start by calculating your weightage and saving the results
          </p>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-200">No matching results</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try a different search term
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredHistory.map((item) => (
              <li key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                        {item.name || 'Unnamed Calculation'}
                      </p>
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {item.resultWeightage.toFixed(2)}/60 {/* Updated max score */}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock size={14} className="flex-shrink-0 mr-1.5" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                  </div>
                  <div className="ml-6 flex-shrink-0 flex items-center space-x-2">
                    <button
                      onClick={() => onLoadCalculation(item)}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => onDeleteCalculation(item.id)}
                      className="p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};