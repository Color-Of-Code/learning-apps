export type Screen = 'Start' | 'Question';

export interface Answer {
  value: string
  // duration: string // timing
}

export interface Question {
  title: string
  correct: string
  candidates: string[]
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
