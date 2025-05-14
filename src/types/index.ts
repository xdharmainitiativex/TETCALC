export interface FormDataType {
  mpFullMarks: number;
  mpObtainMarks: number;
  mpScoreout: number;
  hsFullMarks: number;
  hsObtainMarks: number;
  hsScoreout: number;
  trainingFullMarks: number;
  trainingObtainMarks: number;
  trainingScoreout: number;
  tetObtainMarks: number;
  tetMarksOutOf5: number; // Renamed from tetMarksOutOf15
  interviewMarks: number;
  extraCurricularMarks: number;
  resultWeightage: number;
}

export interface HistoryItemType {
  id: number;
  date: Date;
  name?: string;
  data: FormDataType;
  resultWeightage: number;
}