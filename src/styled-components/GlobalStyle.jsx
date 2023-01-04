import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Prosto+One&display=swap'); 

  :root {
    --bg-primary: azure;
    --bg-secondary: white;
    --text-primary: black;
    --text-secondary: rgba(9, 9, 75, 0.89);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    /* color: var(--text-primary); */
  }

  body {
    background: var(--bg-primary);
    color: var(--text-primary);
  }
`

export default GlobalStyle
