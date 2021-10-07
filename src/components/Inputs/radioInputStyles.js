import styled from 'styled-components'


export const RadioLabel = styled.span`
  display: flex;
  align-items: center;
`

export const RadioControl = styled.span`
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--color-primary);
`

export const Label = styled.label`
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 16px;

  input + ${RadioControl}::before {
    content: "";
    width: 9px;
    height: 9px;
    box-shadow: inset 9px 9px var(--color-primary);
    border-radius: 50%;
    transition: 180ms transform ease-in-out;
    transform: scale(0);
  }

  input:checked + ${RadioControl}::before {
    transform: scale(1);
  }
`

export const RadioInput = styled.span`
  display: flex;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`


