import { useState } from 'react';
import { ArrowRight, CalculatorIcon, Save, RefreshCw } from 'lucide-react';
import { FormDataType } from '../types';
import { InputField } from './InputField';

interface CalculatorFormProps {
  formData: FormDataType;
  onInputChange: (field: keyof FormDataType, value: number) => void;
  onCalculate: () => void;
  onClearForm: () => void;
  onSaveCalculation: (name: string) => void;
  calculationDisabled: boolean;
}

export const CalculatorForm = ({
  formData, 
  onInputChange, 
  onCalculate, 
  onClearForm,
  onSaveCalculation,
  calculationDisabled // This prop now correctly reflects overall form validity
}: CalculatorFormProps) => {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveName, setSaveName] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Primary TET Weightage Calculator
        </h2>
        <div className="flex mt-3 sm:mt-0 space-x-2">
          <button
            onClick={onClearForm}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw size={16} className="mr-2" />
            Reset
          </button>
          {/* Save button shown if there's a result calculated, regardless of explicit "Calculate" click for ResultCard display */}
          {formData.resultWeightage > 0 && ( 
            <button
              onClick={() => setSaveDialogOpen(true)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">MP (Madhyamik) Scores</h3>
            <div className="space-y-3">
              <InputField
                label="Full Marks"
                value={formData.mpFullMarks}
                onChange={(value) => onInputChange('mpFullMarks', value)}
                disabled={false} 
              />
              <InputField
                label="Obtain Marks"
                value={formData.mpObtainMarks}
                onChange={(value) => onInputChange('mpObtainMarks', value)}
                max={formData.mpFullMarks > 0 ? formData.mpFullMarks : 0}
                disabled={formData.mpFullMarks <= 0} 
              />
              <InputField
                label="Scoreout (of 5)"
                value={formData.mpScoreout}
                onChange={(value) => onInputChange('mpScoreout', value)}
                disabled 
                tooltip="Automatically calculated as (Obtain Marks / Full Marks) * 5"
              />
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
            <h3 className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">HS (Higher Secondary) Scores</h3>
            <div className="space-y-3">
              <InputField
                label="Full Marks"
                value={formData.hsFullMarks}
                onChange={(value) => onInputChange('hsFullMarks', value)}
                disabled={false} 
              />
              <InputField
                label="Obtain Marks"
                value={formData.hsObtainMarks}
                onChange={(value) => onInputChange('hsObtainMarks', value)}
                max={formData.hsFullMarks > 0 ? formData.hsFullMarks : 0}
                disabled={formData.hsFullMarks <= 0} 
              />
              <InputField
                label="Scoreout (of 10)"
                value={formData.hsScoreout}
                onChange={(value) => onInputChange('hsScoreout', value)}
                disabled 
                tooltip="Automatically calculated as (Obtain Marks / Full Marks) * 10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
            <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Training (B.Ed/D.El.Ed) Scores</h3>
            <div className="space-y-3">
              <InputField
                label="Full Marks"
                value={formData.trainingFullMarks}
                onChange={(value) => onInputChange('trainingFullMarks', value)}
                disabled={false} 
              />
              <InputField
                label="Obtain Marks"
                value={formData.trainingObtainMarks}
                onChange={(value) => onInputChange('trainingObtainMarks', value)}
                max={formData.trainingFullMarks > 0 ? formData.trainingFullMarks : 0}
                disabled={formData.trainingFullMarks <= 0} 
              />
              <InputField
                label="Scoreout (of 15)"
                value={formData.trainingScoreout}
                onChange={(value) => onInputChange('trainingScoreout', value)} 
                disabled 
                tooltip="Automatically calculated as (Obtain Marks / Full Marks) * 15"
              />
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg">
            <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Additional Scores</h3>
            <div className="space-y-3">
              <InputField
                label="TET Obtain Marks (Full marks 150)"
                value={formData.tetObtainMarks}
                onChange={(value) => onInputChange('tetObtainMarks', value)}
                max={150}
              />
              <InputField
                label="TET Marks out of 5"
                value={formData.tetMarksOutOf5}
                onChange={(value) => onInputChange('tetMarksOutOf5', value)}
                disabled
                tooltip="Automatically calculated as (TET Obtain Marks / 150) * 5"
              />
              <InputField
                label="Interview Marks (Full marks 10)"
                value={formData.interviewMarks}
                onChange={(value) => onInputChange('interviewMarks', value)}
                max={10}
              />
              <InputField
                label="Extra-Curricular Activities Marks (Max 5)"
                value={formData.extraCurricularMarks}
                onChange={(value) => onInputChange('extraCurricularMarks', value)}
                max={5}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onCalculate}
          disabled={calculationDisabled} // Use the comprehensive disable logic
          className={`inline-flex items-center px-6 py-3 text-base font-medium text-white rounded-lg shadow-md transition-all transform hover:scale-105 ${
            calculationDisabled 
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-70' 
            : 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700'
          }`}
          title={calculationDisabled ? "Please fill all fields correctly to enable calculation." : "Calculate Weightage"}
        >
          <CalculatorIcon size={20} className="mr-2" />
          Calculate Weightage
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>

      {/* Save Dialog */}
      {saveDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md m-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Save Calculation</h3>
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Enter a name for this calculation"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSaveDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (saveName.trim()) {
                    onSaveCalculation(saveName);
                    setSaveDialogOpen(false);
                    setSaveName('');
                  }
                }}
                disabled={!saveName.trim()}
                className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
                  saveName.trim() ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};