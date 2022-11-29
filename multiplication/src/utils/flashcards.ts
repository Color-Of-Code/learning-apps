import { uniq } from 'lodash';
import { FlashCard } from '../types';

export function createFlashcards(): FlashCard[] {
  const cards: FlashCard[] = [];
  for (let a = 1; a < 11; a++) {
    for (let b = 1; b < 11; b++) {
      const title = `${a} x ${b}`;
      const correct = `${a * b}`;
      const incorrect = uniq(
        [`${a * b - 2}`, `${a * b + 2}`, `${a * (b - 1)}`, `${a * (b + 1)}`].filter(
          n => +n > 0 && +n < 100 && +n !== +correct
        )
      );
      cards.push({
        question: {
          title,
          correct,
          options: [...incorrect, correct]
        },
        group: 0,
        statistics: {
          ng: 0,
          ok: 0,
          errors: []
        }
      });
    }
  }
  return cards;
}

