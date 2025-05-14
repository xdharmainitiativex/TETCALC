import { useState, useEffect } from 'react';
import { CalculatorForm } from './CalculatorForm';
import { ResultCard } from './ResultCard';
import { CalculationHistory } from './CalculationHistory';
import { calculateWeightage } from '../utils/calculations';
import { FormDataType, HistoryItemType } from '../types';

export const Calculator = () => {
  const [formData, setFormData] = useState<FormDataType>({
    mpFullMarks: 700,
    mpObtainMarks: 0,
    mpScoreout: 0,
    hsFullMarks: 500,
    hsObtainMarks: 0,
    hsScoreout: 0,
    trainingFullMarks: 700, // Default to 700
    trainingObtainMarks: 0,
    trainingScoreout: 0,
    tetObtainMarks: 0,
    tetMarksOutOf5: 0,
    interviewMarks: 0,
    extraCurricularMarks: 0,
    resultWeightage: 0
  });
  
  const [history, setHistory] = useState<HistoryItemType[]>([]);
  const [activeTab, setActiveTab] = useState('calculator');
  const [showResult, setShowResult] = useState(false); // New state to control ResultCard visibility

  const handleInputChange = (field: keyof FormDataType, value: number) => {
    setShowResult(false); // Hide result card when inputs change
    setFormData(prev => {
      const newFormData = { ...prev, [field]: value };
      
      if (field === 'mpFullMarks') {
        if (value <= 0) { 
          newFormData.mpObtainMarks = 0;
        } else if (newFormData.mpObtainMarks > value) { 
          newFormData.mpObtainMarks = value;
        }
      }
      if (field === 'hsFullMarks') {
        if (value <= 0) {
          newFormData.hsObtainMarks = 0;
        } else if (newFormData.hsObtainMarks > value) {
          newFormData.hsObtainMarks = value;
        }
      }
      if (field === 'trainingFullMarks') {
        if (value <= 0) {
          newFormData.trainingObtainMarks = 0;
        } else if (newFormData.trainingObtainMarks > value) {
          newFormData.trainingObtainMarks = value;
        }
      }
      
      return calculateWeightage(newFormData);
    });
  };

  const handleCalculate = () => {
    // Form data is already current due to auto-calculation in handleInputChange
    const result = calculateWeightage(formData); 
    setFormData(result); // Ensure state is updated with final calculation before showing
    setShowResult(true); // Show the result card

    // Add to history
    const historyItem: HistoryItemType = {
      id: Date.now(),
      date: new Date(),
      data: { ...result },
      resultWeightage: result.resultWeightage
    };
    setHistory(prev => [historyItem, ...prev]);
  };

  const handleSaveCalculation = (name: string) => {
    const currentCalculatedData = calculateWeightage(formData);
    setFormData(currentCalculatedData); 

    const historyItem: HistoryItemType = {
      id: Date.now(),
      date: new Date(),
      name,
      data: { ...currentCalculatedData },
      resultWeightage: currentCalculatedData.resultWeightage
    };
    setHistory(prev => [historyItem, ...prev]);
    // Optionally, if you want "Save" to also show the result card:
    // setShowResult(true); 
  };

  const handleLoadCalculation = (item: HistoryItemType) => {
    setFormData(item.data);
    setActiveTab('calculator');
    setShowResult(true); // Show result when loading from history
  };

  const handleClearForm = () => {
    setShowResult(false); // Hide result card on clear
    setFormData({
      mpFullMarks: 700,
      mpObtainMarks: 0,
      mpScoreout: 0,
      hsFullMarks: 500,
      hsObtainMarks: 0,
      hsScoreout: 0,
      trainingFullMarks: 700,
      trainingObtainMarks: 0,
      trainingScoreout: 0,
      tetObtainMarks: 0,
      tetMarksOutOf5: 0,
      interviewMarks: 0,
      extraCurricularMarks: 0,
      resultWeightage: 0
    });
  };
  
  const isFormValid =
    formData.mpFullMarks > 0 &&
    formData.mpObtainMarks >= 0 && formData.mpObtainMarks <= formData.mpFullMarks &&
    formData.hsFullMarks > 0 &&
    formData.hsObtainMarks >= 0 && formData.hsObtainMarks <= formData.hsFullMarks &&
    formData.trainingFullMarks > 0 &&
    formData.trainingObtainMarks >= 0 && formData.trainingObtainMarks <= formData.trainingFullMarks &&
    formData.tetObtainMarks >= 0 && formData.tetObtainMarks <= 150 &&
    formData.interviewMarks >= 0 && formData.interviewMarks <= 10 &&
    formData.extraCurricularMarks >= 0 && formData.extraCurricularMarks <= 5;

  const calculationDisabled = !isFormValid;

  // Effect to initialize scores on mount if needed, or ensure form state is clean
  useEffect(() => {
    setFormData(prev => calculateWeightage(prev));
    setShowResult(false); // Ensure result is not shown on initial load or re-renders without calculation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty to run once on mount

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-6 py-4 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'calculator'
                  ? 'text-blue-700 border-b-2 border-blue-700 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}
            >
              Calculator
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-4 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'history'
                  ? 'text-blue-700 border-b-2 border-blue-700 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}
            >
              History
              {history.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                  {history.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'calculator' ? (
            <div className="space-y-8">
              <CalculatorForm 
                formData={formData} 
                onInputChange={handleInputChange}
                onCalculate={handleCalculate}
                onClearForm={handleClearForm}
                onSaveCalculation={handleSaveCalculation}
                calculationDisabled={calculationDisabled}
              />
              {showResult && ( // Conditionally render ResultCard based on showResult state
                <ResultCard 
                  resultWeightage={formData.resultWeightage} 
                  formData={formData} 
                />
              )}
            </div>
          ) : (
            <CalculationHistory 
              history={history} 
              onLoadCalculation={handleLoadCalculation}
              onDeleteCalculation={(id) => {
                setHistory(prev => prev.filter(item => item.id !== id));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};