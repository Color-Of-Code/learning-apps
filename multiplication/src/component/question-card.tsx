import React, { Dispatch } from 'react';

import { Answer, Question } from '../types';
import Command from './command';

import { Wrapper, ButtonWrapper, QuestionWrapper } from './question-card.styles';

interface Props {
  question: Question
  onAnswer: Dispatch<Answer>
  onNext: Dispatch<void>
  answer: Answer | undefined
}

const QuestionCard: React.FC<Props> = ({
  question,
  onAnswer,
  onNext,
  answer
}) => {
  const answerProvided = !(answer == null);

  const procesAnswer = (answer: string): void => {
    onAnswer({
      question,
      answer
    });
  };

  const showNext = answer !== undefined;

  return (
    <Wrapper>
      <QuestionWrapper>{question.question}</QuestionWrapper>

      {question.possibleAnswers.map((a: string, i: number) => (
        <ButtonWrapper
          correct={question.correctAnswer === a && answerProvided}
          userClicked={answer?.answer === a}
          key={i}
        >
          <button disabled={answerProvided} value={a} onClick={() => procesAnswer(a)}>
            <span>{a}</span>
          </button>
        </ButtonWrapper>
      ))}
      {showNext && <Command onClick={onNext}>NEXT</Command>}
    </Wrapper>
  );
};

export default QuestionCard;
