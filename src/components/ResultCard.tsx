import { Download, Award } from 'lucide-react';
import { FormDataType } from '../types';
import { WeightageChart } from './WeightageChart';

interface ResultCardProps {
  resultWeightage: number;
  formData: FormDataType;
}

export const ResultCard = ({ resultWeightage, formData }: ResultCardProps) => {
  const generatePDF = () => {
    // This would be implemented with a PDF generation library
    alert('PDF generation feature would be implemented here');
  };

  // Maximum possible score is now 50
  const MAX_TOTAL_SCORE = 50;
  const percentage = resultWeightage > 0 && MAX_TOTAL_SCORE > 0 ? (resultWeightage / MAX_TOTAL_SCORE) * 100 : 0;

  // Determine qualification status (example: 50% of maximum 50)
  const qualificationThreshold = MAX_TOTAL_SCORE * 0.5; // e.g., 25
  const isQualified = resultWeightage >= qualificationThreshold;

  // Calculate contribution of each component
  const components = [
    { name: 'MP', value: formData.mpScoreout, maxValue: 5 },
    { name: 'HS', value: formData.hsScoreout, maxValue: 10 },
    { name: 'Training', value: formData.trainingScoreout, maxValue: 15 },
    { name: 'TET', value: formData.tetMarksOutOf5, maxValue: 5 }, // Updated
    { name: 'Interview', value: formData.interviewMarks, maxValue: 10 },
    { name: 'Extra-Curricular', value: formData.extraCurricularMarks, maxValue: 5 }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 shadow-lg animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Award className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
            Calculation Result
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Detailed breakdown of your recruitment weightage
          </p>
        </div>
        <button
          onClick={generatePDF}
          className="mt-3 md:mt-0 inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-800/40 dark:text-blue-300 dark:hover:bg-blue-800/60 transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 h-full">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-1">Total Weightage</h3>
              <div className="text-4xl font-bold text-blue-700 dark:text-blue-400">
                {resultWeightage.toFixed(2)}
                <span className="text-lg text-gray-500 dark:text-gray-400">/{MAX_TOTAL_SCORE}</span> {/* Updated */}
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {percentage.toFixed(1)}% of maximum score
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className={`text-lg font-medium ${
                  isQualified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {isQualified ? 'Qualified' : 'Not Qualified'}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Minimum requirement: {qualificationThreshold.toFixed(0)}/{MAX_TOTAL_SCORE}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 h-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-4">Score Breakdown</h3>
            <div className="h-64">
              <WeightageChart components={components} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Component
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Your Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Maximum
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {components.map((component) => (
              <tr key={component.name} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {component.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {component.value.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {component.maxValue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
                      style={{ width: `${component.maxValue > 0 ? (component.value / component.maxValue) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 inline-block">
                    {component.maxValue > 0 ? ((component.value / component.maxValue) * 100).toFixed(1) : '0.0'}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};