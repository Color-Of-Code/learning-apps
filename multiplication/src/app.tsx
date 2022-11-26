import React from 'react';

import {Answer, Question, Screen} from './types';
import { createQuestions } from './utils';

import QuestionCard from './component/question-card';

import { GlobalStyle, Wrapper } from './app.styles';

const questionAmount = 10;

export default function App () {
  const [screen, setScreen] = React.useState<Screen>(Screen.Start);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [number, setNumber] = React.useState<number>(0);
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [score, setScore] = React.useState<number>(0);

  const currentQuestion = questions[number];
  const currentAnswer = answers[number];

  const startQuiz = () => {
    const newQuestions = createQuestions(questionAmount);
    setQuestions(newQuestions);
    setNumber(0);
    setScore(0);
    setAnswers([]);
    setScreen(Screen.Question);
  };

  const processAnswer = (answer: Answer) => {
    const correct = currentQuestion.correctAnswer === answer.answer;
    if (correct) setScore((prev) => prev + 1);
    setAnswers((prev) => [...prev, answer]);
  };

  const handleNext = () => {
    if (number < questionAmount - 1) {
      setNumber((prev) => prev + 1);
      setScreen(Screen.Question);
    } else {
      setScreen(Screen.End);
    }
  };

  const showEnd = screen === Screen.End;
  const showScore = screen === Screen.Question || screen === Screen.End;
  const showStart = screen === Screen.Start || screen === Screen.End;
  const showQuestion = screen === Screen.Question;
  const showNext = showQuestion && !!currentAnswer;

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Lara's Multiplication</h1>
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
}
