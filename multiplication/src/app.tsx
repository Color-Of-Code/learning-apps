import React, { useState } from 'react';

import { Answer, FlashCard, Question, Statistics } from './types';

import { createQuestion } from './utils/questions';
import { createFlashcards } from './utils/flashcards';
import { dropCard, pickCard } from './utils/leitner';

import { GlobalStyle, Title, Wrapper } from './app.styles';
import { useLocalStorage } from './hooks/use-local-storage';

import QuestionCard from './component/question-card';
import StatisticsView from './component/statistics-view';
import Command from './component/command';
import Score from './component/score';

const App: React.FC = () => {
  const [deck, saveDeck] = useLocalStorage<FlashCard[]>('flashcards', createFlashcards);
  const [card, setCard] = useState<FlashCard>();
  const [answer, setAnswer] = useState<Answer>();
  const [question, setQuestion] = useState<Question>();
  const [score, setScore] = useState<number>(0);

  const start = (): void => {
    saveDeck(deck);
    setScore(0);
    processNext();
  };

  const processNext = (): void => {
    const c = pickCard(deck);
    setCard(c);
    setQuestion(createQuestion(c));
    setAnswer(undefined);
  };

  const processAnswer = (answer: Answer): void => {
    if (card === undefined) return;

    const q = card.question;
    const correct = q.correct === answer.value;
    if (correct) setScore(prev => prev + 1);

    setAnswer(answer);
    dropCard(card, answer);
    saveDeck(deck);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Title>Multiplication</Title>
        <StatisticsView deck={deck} />
        {card !== undefined ? (
          <>
            <Score value={score} />
            <QuestionCard
              question={question}
              answer={answer}
              onAnswer={processAnswer}
              onNext={processNext}
            />
          </>
        ) : (
          <Command onClick={start}>START</Command>
        )}
      </Wrapper>
    </>
  );
};

export default App;
