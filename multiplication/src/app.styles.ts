import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html{
    height: 100%;
  }

  body{
    background-size: cover;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Code Sans', sans-serif;
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
  background-size: 100%;
  background-clip: text;
  font-size: 35px;
  font-weight: bolder;
  text-align: center;
  margin: 20px;
`;
