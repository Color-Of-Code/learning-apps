import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html{
    height: 100%;
  }

  body{
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  *{
    box-sizing: border-box;
  }

  .App {
    font-family: sans-serif;
    text-align: center;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .score {
    font-size: 1.2rem;
    background: #6695c1;
    width: 100%;
    text-align: center;
    color: #fff;
    box-shadow: 2px 2px #0085a3;
    padding: 2px;
  }

  h1 {
    background: linear-gradient(to right, rgb(39, 183, 198), rgb(45, 162, 182)) 0% 0% / 100%;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 35px;
    font-weight: 400;
    text-align: center;
    margin: 20px;
  }

  .start,
  .next {
    cursor: pointer;
    background: rgb(26, 111, 108);
    width: 50%;
    color: #fff;
    border: none;
    padding: 5px;
    margin: 20px 0px;
    font-weight: bold;
    box-shadow: 1px 3px #0038a3;
    max-width: 300px;
  }

  .complete {
    font-size: 1.2 rem;
    font-weight: bold;
    color: green;
  }
`;
