import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --bg-primary: #DCDCDC;
    --bg-secondary: white;
    --text-primary: black;
    --text-secondary: rgba(9, 9, 75, 0.89);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 22px;
    /* color: var(--text-primary); */
  }

  body {
    background: var(--bg-primary);
    color: var(--text-primary);
  }
`

export default GlobalStyle
