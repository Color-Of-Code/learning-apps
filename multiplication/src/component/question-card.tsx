import React, { Dispatch } from 'react';

import { Answer, Question } from '../types';

import { Wrapper, ButtonWrapper } from './question-card.styles';

interface Props {
  question: Question
  onAnswer: Dispatch<Answer>
  answer: Answer | undefined
  number: number
  total: number
}

const QuestionCard: React.FC<Props> = ({
  question,
  onAnswer,
  answer,
  number,
  total
}) => {
  const answerProvided = !(answer == null);

  const procesAnswer = (answer: string): void => {
    onAnswer({
      question,
      answer
    });
  };

  return (
    <Wrapper>
      <p key={'number'} className="number">{number} / {total}</p>
      <p key={'question'} className="question">{question.question}</p>

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
    </Wrapper>
  );
};

export default QuestionCard;
