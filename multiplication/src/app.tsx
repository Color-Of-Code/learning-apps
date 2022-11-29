import React, { useState } from 'react';

import { Answer, FlashCard, Question, Statistics } from './types';
import { createQuestion, pickCard } from './utils/questions';
import { createFlashcards } from './utils/flashcards';

import { GlobalStyle, Title, Wrapper } from './app.styles';
import { useLocalStorage } from './hooks/use-local-storage';

import QuestionCard from './component/question-card';
import StatisticsView from './component/statistics';
import Command from './component/command';
import Score from './component/score';

const App: React.FC = () => {
  const [deck] = useState<FlashCard[]>(createFlashcards);
  const [card, setCard] = useState<FlashCard>();
  const [answer, setAnswer] = useState<Answer>();
  const [question, setQuestion] = useState<Question>();
  const [score, setScore] = useState<number>(0);
  const [statistics, saveStatistics] = useLocalStorage<Statistics>(
    'statistics',
    {}
  );

  const start = (): void => {
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

    const key = q.title;
    const value = statistics[key] ?? { ok: 0, ng: 0, errors: [] };
    const errors = correct
      ? value.errors ?? []
      : [...(value.errors ?? []), +answer.value];

    const statUpdate = {
      [key]: {
        ok: value.ok + (correct ? 1 : 0),
        ng: value.ng + (correct ? 0 : 1),
        errors
      }
    };
    saveStatistics({
      ...statistics,
      ...statUpdate
    });
    setAnswer(answer);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Title>Multiplication</Title>
        <StatisticsView statistics={statistics} />
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
