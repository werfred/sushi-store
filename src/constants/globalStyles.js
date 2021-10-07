import {createGlobalStyle, css} from 'styled-components'
import {normalize} from 'styled-normalize'
import {MEDIA_QUERIES} from 'constants/mediaQueriesList'


export const SubmitButtonStyles = css`
  cursor: pointer;
  padding: 14px 20px;
  border-radius: 30px;
  display: inline-block;
  font-weight: 600;
  border: 1px solid ${props => props.active === true ? 'var(--color-primary)' : '#afaeae'};
  background-color: ${props => props.active === true ? 'var(--color-primary)' : '#afaeae'};
  transition: all 0.2s;
  color: #fff;
  &:active {
    transform: translateY(2px);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border: 1px solid ${props => props.active === true ? 'var(--color-primary)' : '#b7b7b7'};
      background-color: ${props => props.active === true ? 'var(--color-primary)' : '#b7b7b7'};
    }
  }
 
  ${MEDIA_QUERIES.md} {
    padding: 12px 16px;
    font-size: 14px;
  }
  ${MEDIA_QUERIES.sm} {
    padding: 10px 14px;
  }
  ${MEDIA_QUERIES.xs} {
    padding: 8px 12px;
    font-size: 12px;
  }
`

export const defaultTransition = css`
  ${({state}) => {
    switch (state) {
      case 'entering':
        return css`
          opacity: 0;
        `
      case 'entered':
        return css`
          opacity: 1;
        `
      case 'exiting':
        return css`
          opacity: 0;
        `
      case 'exited':
        return css`
          opacity: 0;
        `
    }
  }};
`

export const ScrollBar = css`
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #C4C4C4;
    border-top: 2px solid #fff;
    border-bottom: 2px solid #fff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-text);
    border-radius: 34px;
  }
`

export const GlobalStyles = createGlobalStyle`
  ${normalize}
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;

    --color-text: #1f1f1f;
    --color-primary: #f69026;
    --color-white-bg: #fafafa;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  img {
    max-width: 100%;
    display: block;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  body {
    overflow-x: hidden;
    position: relative;
    color: var(--color-text);
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    line-height: 1.2;

    -webkit-tap-highlight-color: transparent;
  }

  ::-moz-selection {
    background-color: var(--color-primary);
    color: #fff;
  }

  ::selection {
    background-color: var(--color-primary);
    color: #fff;
  }
`
