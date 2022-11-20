import React from "react";

import { AnswerObject } from "../app";

import { Wrapper, ButtonWrapper } from "./question-card.styles";

type Props = {
  question: string
  answers: string[]
  callback: any
  userAnswer: AnswerObject | undefined
  questionNum: number
  totalQuestions: number
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions
}) => {
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNum} / {totalQuestions}
      </p>
      <p className="question">{question}</p>

      {answers.map((answer: string) => (
        <ButtonWrapper
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
          key={answer}
        >
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span>{answer}</span>
          </button>
        </ButtonWrapper>
      ))}
    </Wrapper>
  );
};

export default QuestionCard;
