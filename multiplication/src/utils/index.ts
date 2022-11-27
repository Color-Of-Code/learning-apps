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
      n => +n > 0 && +n < 100 && +n !== +correct
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

function hex (input: number): string {
  const x = input.toString(16);
  return x.length === 1 ? '0' + x : x;
}

function getValue (input: string, position: number): number {
  return parseInt(input.substring(position, position + 2), 16);
}

function interpolateValue (
  value1: number,
  value2: number,
  ratio: number
): number {
  return Math.ceil(value1 * ratio + value2 * (1 - ratio));
}

export function interpolateColor (
  color1: string,
  color2: string,
  ratio: number
): string {
  const rgb = [0, 2, 4].map(x =>
    interpolateValue(getValue(color1, x), getValue(color2, x), ratio)
  );
  return '#' + rgb.map(hex).join('');
}
