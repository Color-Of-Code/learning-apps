import React, { useState } from 'react';

import { Answer, Question, Screen, Statistics } from './types';
import { createQuestions } from './utils';

import { GlobalStyle, Title, Wrapper } from './app.styles';
import { useLocalStorage } from './hooks/use-local-storage';

import QuestionCard from './component/question-card';
import StatisticsView from './component/statistics';
import BannerEnd from './component/banner-end';
import Command from './component/command';
import Score from './component/score';

const questionAmount = 20;

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('Start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState<number>(0);
  const [statistics, setStatistics] = useLocalStorage<Statistics>(
    'statistics',
    {}
  );

  const currentQuestion = questions[number];
  const currentAnswer = answers[number];

  const start = (): void => {
    const newQuestions = createQuestions(questionAmount);
    setQuestions(newQuestions);
    setNumber(0);
    setScore(0);
    setAnswers([]);
    setScreen('Question');
  };

  const processAnswer = (answer: Answer): void => {
    const correct = currentQuestion.correctAnswer === answer.answer;
    if (correct) setScore(prev => prev + 1);

    const key = currentQuestion.question;
    const value = statistics[key] ?? { ok: 0, ng: 0, errors: [] };
    const errors = correct ? (value.errors ?? []) : [...(value.errors ?? []), +answer.answer];

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
    setAnswers(prev => [...prev, answer]);
  };

  const processNext = (): void => {
    if (number < questionAmount - 1) {
      setScreen('Question');
      setNumber(prev => prev + 1);
    } else {
      setScreen('End');
    }
  };

  const showEnd = screen === 'End';
  const showScore = screen !== 'Start';
  const showStart = screen === 'Start' || screen === 'End';
  const showQuestion = screen === 'Question';

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Title>Multiplication</Title>
        <StatisticsView statistics={statistics} />
        {showEnd && <BannerEnd />}
        {showStart && <Command onClick={start}>START</Command>}
        {showScore && <Score value={score} maximum={questionAmount} remaining={questionAmount - number - 1} />}
        {showQuestion && (
          <QuestionCard
            question={currentQuestion}
            answer={currentAnswer}
            onAnswer={processAnswer}
            onNext={processNext}
          />
        )}
      </Wrapper>
    </>
  );
};

export default App;
