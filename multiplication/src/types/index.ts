export interface Answer {
  question: Question
  answer: string
}

export type Screen = 'Start' | 'Question' | 'End';

export interface Question {
  title: string
  correctAnswer: string
  possibleAnswers: string[]
}

export interface FlashCard {
  question: Question
  group: number
  statistics: StatisticsEntry
}

export interface StatisticsEntry {
  ng: number
  ok: number
  errors: number[]
}

export interface Statistics {
  [key: string]: StatisticsEntry
}
