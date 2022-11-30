import { FlashCard, Question } from '../types';

const shuffleArray = (array: string[]): string[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export function createQuestion(card: FlashCard): Question {
  const { title, correct, options } = card.question;
  return {
    title,
    correct,
    options: shuffleArray(options)
  };
}
