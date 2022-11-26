import { uniq } from 'lodash';

export interface Answer {
  question: Question
  answer: string
}

export enum Screen {
  Start,
  Question,
  End,
}

const shuffleArray = (array: any[]): any[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export interface Question {
  question: string
  correctAnswer: string
  possibleAnswers: string[]
}

function createQuestion (): Question {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const question = `${a} x ${b}`;
  const correct = `${a * b}`;
  const incorrect = uniq(
    [`${a * b - 2}`, `${a * b + 2}`, `${a * (b - 1)}`, `${a * (b + 1)}`].filter(
      (n) => +n > 0 && +n < 100 && +n != +correct
    )
  );
  return {
    question,
    correctAnswer: correct,
    possibleAnswers: shuffleArray([...incorrect, correct])
  };
}

export const createQuestions = (amount: number): Question[] =>
  [...Array(amount).keys()].map(() => createQuestion());
