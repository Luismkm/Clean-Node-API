type SurveyResultAnswer = {
  image?: string
  answer: string
  count: number
  percent: number
}

export type ISurveyResult = {
  surveyId: string,
  answers: SurveyResultAnswer[]
  question: string,
  date: Date
}
