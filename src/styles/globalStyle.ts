import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css");

  * {
    margin: 0;
    padding: 0;

    font-family: 'Pretendard','Noto Sans KR', sans-serif;
    font-style: normal;
    line-height: normal;

    box-sizing: border-box; //padding과 border가 width 안에 포함
  }

  #root {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center; 
    align-items: center;   
  }

  body {
    margin: 0;
    background-color: #f0f0f0; 
    display: flex;
    justify-content: center; 
    align-items: center;     
    height: 100dvh;  
    width: 100dvw;
    }

  input {
    border: none;
    padding: 0;
    margin: 0;
    background-color: transparent;
  }

  input:focus {
    outline: none;
  }
`;

export default GlobalStyle;
