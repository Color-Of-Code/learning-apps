import { uniq } from 'lodash';

import { Question } from '../types';

const shuffleArray = (array: string[]): string[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

function createQuestion (): Question {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const question = `${a} x ${b}`;
  const correct = `${a * b}`;
  const incorrect = uniq(
    [`${a * b - 2}`, `${a * b + 2}`, `${a * (b - 1)}`, `${a * (b + 1)}`].filter(
      (n) => +n > 0 && +n < 100 && +n !== +correct
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
