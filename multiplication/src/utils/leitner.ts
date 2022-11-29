import { Answer, FlashCard } from '../types';

function pickCards (deck: FlashCard[], amount: number): FlashCard[] {
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

export function dropCard (card: FlashCard, answer: Answer): void {
  const q = card.question;
  const correct = answer.value === q.correct;
  const value = card.statistics;
  const errors = correct
    ? value.errors ?? []
    : [...(value.errors ?? []), +answer.value];

  card.group = correct ? card.group + 1 : 0;
  card.statistics = {
    ok: value.ok + (correct ? 1 : 0),
    ng: value.ng + (correct ? 0 : 1),
    errors
  };
}
