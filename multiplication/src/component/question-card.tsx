import React from 'react';

import { Answer, Question } from '../types';

import { Wrapper, ButtonWrapper } from './question-card.styles';

interface Props {
  question: Question
  onAnswer: any
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
  const answerProvided = !!answer;

  const procesAnswer = (answer: string) => {
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
