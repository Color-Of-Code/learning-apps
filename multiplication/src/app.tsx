import React, { useState } from 'react';

import { Answer, Question, Screen, Statistics } from './types';
import { createQuestions } from './utils';

import QuestionCard from './component/question-card';

import { GlobalStyle, Wrapper } from './app.styles';
import { useLocalStorage } from './hooks/use-local-storage';
import StatisticsView from './component/statistics';

const questionAmount = 10;

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.Start);
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

  const startQuiz = (): void => {
    const newQuestions = createQuestions(questionAmount);
    setQuestions(newQuestions);
    setNumber(0);
    setScore(0);
    setAnswers([]);
    setScreen(Screen.Question);
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

  const handleNext = (): void => {
    if (number < questionAmount - 1) {
      setNumber(prev => prev + 1);
      setScreen(Screen.Question);
    } else {
      setScreen(Screen.End);
    }
  };

  const showEnd = screen === Screen.End;
  const showScore = screen === Screen.Question || screen === Screen.End;
  const showStart = screen === Screen.Start || screen === Screen.End;
  const showQuestion = screen === Screen.Question;
  const showNext = showQuestion && (currentAnswer !== undefined);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Multiplication</h1>
        <StatisticsView statistics={statistics} />
        {showEnd && <div className="complete">END</div>}
        {showStart && (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        )}
        {showScore && <p className="score">Score: {score}</p>}
        {showQuestion && (
          <QuestionCard
            number={number + 1}
            question={currentQuestion}
            total={questionAmount}
            answer={currentAnswer}
            onAnswer={processAnswer}
          />
        )}
        {showNext && (
          <button className="next" onClick={handleNext}>
            Next
          </button>
        )}
      </Wrapper>
    </>
  );
};

export default App;
