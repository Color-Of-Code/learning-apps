import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px;

  .number {
    font-size: 1.1rem;
  }

  .question {
    font-weight: bold;
  }
`;

interface ButtonProps {
  correct: boolean
  userClicked: boolean
}

export const ButtonWrapper = styled.div<ButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
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
