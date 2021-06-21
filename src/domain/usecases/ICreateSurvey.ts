export interface SurveyAnswer {
  image: string
  answer: string
}

export interface ICreateSurveyDTO {
  question: string,
  answers: SurveyAnswer[]
}

export interface ICreateSurvey {
  create(data: ICreateSurveyDTO): Promise<void>
}
