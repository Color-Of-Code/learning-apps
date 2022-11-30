import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html{
    height: 100%;
  }

  body{
    padding: 0 20px;
    justify-content: center;
    font-family: 'Comic Sans', sans-serif;
  }

  *{
    margin: 0;
    padding: 0;

    box-sizing: border-box;
    text-align: center;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  color: darkblue;
  font-size: 40px;
  font-weight: bolder;
  margin: 10px;
`;
