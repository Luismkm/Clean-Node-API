export type SurveyAnswer = {
  image?: string
  answer: string
}

export type ISurvey = {
  id: string,
  question: string,
  answers: SurveyAnswer[]
  date: Date
}
