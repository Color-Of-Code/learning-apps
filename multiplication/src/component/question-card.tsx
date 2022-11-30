import React, { Dispatch } from 'react';

import { Answer, Question } from '../types';
import Command from './command';

import {
  Wrapper,
  ButtonWrapper,
  QuestionWrapper
} from './question-card.styles';

interface Props {
  question: Question;
  onAnswer: Dispatch<Answer>;
  onNext: Dispatch<void>;
  answer: Answer | null;
}

const QuestionCard: React.FC<Props> = ({
  question,
  onAnswer,
  onNext,
  answer
}) => {
  const answerProvided = answer != null;

  const processAnswer = (value: string): void => {
    onAnswer({ value });
  };
  return (
    <Wrapper>
      <QuestionWrapper>{question.title}</QuestionWrapper>

      {question.options.map((a: string, i: number) => (
        <ButtonWrapper
          correct={question.correct === a && answerProvided}
          userClicked={answer?.value === a}
          key={i}
        >
          <button
            disabled={answerProvided}
            value={a}
            onClick={() => processAnswer(a)}
          >
            <span>{a}</span>
          </button>
        </ButtonWrapper>
      ))}
      {answerProvided && <Command onClick={onNext}>NEXT</Command>}
    </Wrapper>
  );
};

export default QuestionCard;
