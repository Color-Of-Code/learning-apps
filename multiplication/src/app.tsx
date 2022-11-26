import React from 'react';

import { createQuestions, QuestionState } from './api';

import QuestionCard from './component/question-card';

import { GlobalStyle, Wrapper } from './app.styles';

const TOTAL_QUESTIONS = 2;

export interface AnswerObject {
  question: string
  correctAnswer: string
  answer: string
  correct: boolean
}

export enum Screen {
  Start,
  Question,
  End,
}

export default function App () {
  const [screen, setScreen] = React.useState<Screen>(Screen.Start);
  const [questions, setQuestions] = React.useState<QuestionState[]>([]);
  const [number, setNumber] = React.useState<number>(0);
  const [answers, setAnswers] = React.useState<AnswerObject[]>([]);
  const [score, setScore] = React.useState<number>(0);

  const startQuiz = () => {
    const newQuestions = createQuestions(TOTAL_QUESTIONS);
    setQuestions(newQuestions);
    setNumber(0);
    setAnswers([]);
    setScreen(Screen.Question);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (screen === Screen.Question) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correctAnswer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        correctAnswer: questions[number].correctAnswer,
        answer,
        correct
      };
      setAnswers((prev) => [...prev, answerObject]);
    }
  };

  const handleNext = () => {
    if (number < TOTAL_QUESTIONS - 1) {
      setNumber((prev) => prev + 1);
      setScreen(Screen.Question);
    } else {
      setScreen(Screen.End);
    }
  };

  const start = screen === Screen.Start;
  const question = screen === Screen.Question;
  const end = screen === Screen.End;

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Lara's Multiplication</h1>
        {end && <div className="complete">END</div>}
        {(start || end) && (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        )}
        {(question || end) && <p className="score">Score: {score}</p>}
        {question && !end && (
          <QuestionCard
            number={number + 1}
            question={questions[number].question}
            answers={questions[number].answers}
            total={TOTAL_QUESTIONS}
            userAnswer={answers ? answers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {question && !end && !!answers[number] && (
          <button className="next" onClick={handleNext}>
            Next
          </button>
        )}
      </Wrapper>
    </>
  );
}
