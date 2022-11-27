import React, { useState } from 'react';

import { Answer, Question, Screen, Statistics } from './types';
import { createQuestions } from './utils/questions';

import { GlobalStyle, Title, Wrapper } from './app.styles';
import { useLocalStorage } from './hooks/use-local-storage';

import QuestionCard from './component/question-card';
import StatisticsView from './component/statistics';
import Command from './component/command';
import Score from './component/score';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('Start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [answer, setAnswer] = useState<Answer|null>(null);
  const [score, setScore] = useState<number>(0);
  const [statistics, setStatistics] = useLocalStorage<Statistics>(
    'statistics',
    {}
  );

  const question = questions[number];

  const start = (): void => {
    const newQuestions = createQuestions(20);
    setQuestions(newQuestions);
    setNumber(0);
    setScore(0);
    setAnswer(null);
    setScreen('Question');
  };

  const processAnswer = (answer: Answer): void => {
    const correct = question.correct === answer.value;
    if (correct) setScore(prev => prev + 1);

    const key = question.title;
    const value = statistics[key] ?? { ok: 0, ng: 0, errors: [] };
    const errors = correct
      ? (value.errors ?? [])
      : [...(value.errors ?? []), +answer.value];

    const statUpdate = {
      [key]: {
        ok: value.ok + (correct ? 1 : 0),
        ng: value.ng + (correct ? 0 : 1),
        errors
      }
    };
    setStatistics({
      ...statistics,
      ...statUpdate
    });
    setAnswer(answer);
  };

  const processNext = (): void => {
    setNumber(prev => prev + 1);
    setAnswer(null);
  };

  const showScore = screen !== 'Start';
  const showStart = screen === 'Start';
  const showQuestion = screen === 'Question';

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Title>Multiplication</Title>
        <StatisticsView statistics={statistics} />
        {showStart && <Command onClick={start}>START</Command>}
        {showScore && <Score value={score} />}
        {showQuestion && (
          <QuestionCard
            question={question}
            answer={answer}
            onAnswer={processAnswer}
            onNext={processNext}
          />
        )}
      </Wrapper>
    </>
  );
};

export default App;
