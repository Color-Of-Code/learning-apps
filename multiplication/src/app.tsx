import React from 'react';

import { createQuestions, QuestionState } from './api';

import QuestionCard from './component/question-card';

import { GlobalStyle, Wrapper } from './app.styles';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string
  correctAnswer: string
  answer: string
  correct: boolean
};

export default function App() {
  const [questions, setQuestions] = React.useState<QuestionState[]>([]);
  const [number, setNumber] = React.useState<number>(0);
  const [gameOver, setGameOver] = React.useState<boolean>(true);
  const [userAnswers, setUserAnswers] = React.useState<AnswerObject[]>([]);
  const [score, setScore] = React.useState<number>(0);
  const [complete, setComplete] = React.useState<boolean>(false);

  const startQuiz = () => {
    const newQuestions = createQuestions(TOTAL_QUESTIONS);
    setComplete(false);
    setQuestions(newQuestions);
    setNumber(0);
    setUserAnswers([]);
    setGameOver(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        correctAnswer: questions[number].correct_answer,
        answer,
        correct
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const handleNext = () => {
    if (number < TOTAL_QUESTIONS - 1) setNumber((prev) => prev + 1);
    else setComplete(true);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Multiplication</h1>
        {complete && <div className="complete">END</div>}

        {gameOver || complete ? (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {!gameOver && !complete && (
          <QuestionCard
            number={number + 1}
            question={questions[number].question}
            answers={questions[number].answers}
            total={TOTAL_QUESTIONS}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameOver && !complete && !!userAnswers[number] && (
          <button className="next" onClick={handleNext}>
            Next
          </button>
        )}
      </Wrapper>
    </>
  );
}
