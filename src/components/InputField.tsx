import { useState } from 'react';
import { Info } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  disabled?: boolean;
  tooltip?: string;
}

export const InputField = ({ 
  label, 
  value, 
  onChange, 
  max, 
  disabled = false,
  tooltip
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        {tooltip && (
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <Info size={16} />
            </button>
            {showTooltip && (
              <div className="absolute right-0 top-6 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>
      <div 
        className={`relative mt-1 rounded-md shadow-sm ${
          isFocused ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
        }`}
      >
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const newValue = e.target.value === '' ? 0 : parseFloat(e.target.value);
            if (!isNaN(newValue)) {
              if (max !== undefined) {
                onChange(Math.min(newValue, max));
              } else {
                onChange(newValue);
              }
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={`block w-full rounded-md focus:outline-none ${
            disabled 
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400' 
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
          } border ${
            isFocused 
              ? 'border-blue-500 dark:border-blue-400' 
              : 'border-gray-300 dark:border-gray-600'
          } py-2 px-3 transition-colors`}
        />
        {max !== undefined && !disabled && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Max: {max}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};