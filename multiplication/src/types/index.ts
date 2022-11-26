export interface Answer {
  question: Question
  answer: string
}

export enum Screen {
  Start,
  Question,
  End,
}

export interface Question {
  question: string
  correctAnswer: string
  possibleAnswers: string[]
}
