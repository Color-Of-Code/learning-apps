import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;

  .number {
    font-size: 1.1rem;
  }
`;

export const QuestionWrapper = styled.div`
  width: 100%;
  max-width: 1000px;

  font-weight: bold;
  font-family: 'sans';
  font-size: 1.2rem;
  padding-top: 1em;
  padding-bottom: 1em;
`;

interface ButtonProps {
  correct: boolean;
  userClicked: boolean;
}

export const ButtonWrapper = styled.div<ButtonProps>`
  width: 100%;
  transition: all 0.3s ease;

  :hover {
    opacity: 0.8;
  }

  button {
    cursor: pointer;
    user-select: none;
    width: 50%;
    background: ${({ correct, userClicked }: ButtonProps) =>
      correct ? '#5af75a' : !correct && userClicked ? 'red' : null};
    margin-bottom: 5px;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 0.8rem;
    border: 1px solid #aaa;
  }
`;
