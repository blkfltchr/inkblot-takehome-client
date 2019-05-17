import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.2em;
  }

  h1, h2 {
    text-align: center;
  }

  a {
    text-decoration: none;
    :focus {
      outline: 0;
    }
  }

  @media only screen and (max-width: 600px) {
    p, label, a {
      font-size: 0.8em !important;
    }

    h1, h2, h5 {
      font-size: 1.2em !important;
    }

    h6 {
      font-size: 1em !important;
    }
}
`;

export default GlobalStyle;
