import React from 'react';

import { AnswerObject } from '../app';

import { Wrapper, ButtonWrapper } from './question-card.styles';

interface Props {
  question: string
  answers: string[]
  callback: any
  userAnswer: AnswerObject | undefined
  number: number
  total: number
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  number,
  total
}) => {
  return (
    <Wrapper>
      <p key={'number'} className="number">{number} / {total}</p>
      <p key={'question'} className="question">{question}</p>

      {answers.map((answer: string, i: number) => (
        <ButtonWrapper
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.userAnswer === answer}
          key={i}
        >
          <button disabled={!(userAnswer == null)} value={answer} onClick={callback}>
            <span>{answer}</span>
          </button>
        </ButtonWrapper>
      ))}
    </Wrapper>
  );
};

export default QuestionCard;
