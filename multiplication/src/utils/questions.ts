import { FlashCard, Question } from '../types';

const shuffleArray = (array: string[]): string[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export function createQuestion (card: FlashCard): Question {
  const { title, correct, options } = card.question;
  return {
    title,
    correct,
    options: shuffleArray(options)
  };
}

export function pickCards (deck: FlashCard[], amount: number): FlashCard[] {
  const size = deck.length;
  let result: number[] = [];
  const pool: number[] = [...Array(size).keys()];

  // Fisher-Yates
  while (result.length < amount) {
    const index = Math.floor(Math.random() * pool.length);
    result = result.concat(pool.splice(index, 1));
  }
  return result.map(n => deck[n]);
}

export function pickCard (deck: FlashCard[]): FlashCard {
  return pickCards(deck, 1)[0];
}
