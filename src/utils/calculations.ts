import { FormDataType } from '../types';

export const calculateWeightage = (data: FormDataType): FormDataType => {
  // Calculate MP score (out of 5)
  const mpScoreout = data.mpFullMarks > 0 
    ? (data.mpObtainMarks / data.mpFullMarks) * 5 
    : 0;
  
  // Calculate HS score (out of 10)
  const hsScoreout = data.hsFullMarks > 0 
    ? (data.hsObtainMarks / data.hsFullMarks) * 10 
    : 0;
  
  // Calculate Training score (out of 15)
  const trainingScoreout = data.trainingFullMarks > 0 
    ? (data.trainingObtainMarks / data.trainingFullMarks) * 15 
    : 0;

  // Calculate TET score (out of 5) - Updated as per Note 4
  const tetMarksOutOf5 = data.tetObtainMarks > 0 && 150 > 0 // ensure tetObtainMarks and 150 are valid
    ? (data.tetObtainMarks / 150) * 5
    : 0;

  // Calculate total weightage (out of 60: MP 5 + HS 10 + Training 15 + TET 5 + Interview 10 + Extra-Curricular 5)
  const resultWeightage = (
    mpScoreout + 
    hsScoreout + 
    trainingScoreout + 
    tetMarksOutOf5 + 
    data.interviewMarks + 
    data.extraCurricularMarks
  );
  
  return {
    ...data,
    mpScoreout: parseFloat(mpScoreout.toFixed(2)), // Ensure two decimal places
    hsScoreout: parseFloat(hsScoreout.toFixed(2)),
    trainingScoreout: parseFloat(trainingScoreout.toFixed(2)),
    tetMarksOutOf5: parseFloat(tetMarksOutOf5.toFixed(2)),
    resultWeightage: parseFloat(resultWeightage.toFixed(2))
  };
};