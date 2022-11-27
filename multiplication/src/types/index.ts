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

export interface StatisticsEntry {
  ng: number
  ok: number
  errors: number[]
}

export interface Statistics {
  [key: string]: StatisticsEntry
}
