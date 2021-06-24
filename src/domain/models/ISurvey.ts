export interface SurveyAnswer {
  image?: string
  answer: string
}

export interface ISurvey {
  id: string,
  question: string,
  answers: SurveyAnswer[]
  date: Date
}
