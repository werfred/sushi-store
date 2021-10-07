import styled from 'styled-components'

import {defaultTransition} from 'constants/globalStyles'


export const Sorting = styled.div`
  align-self: flex-start;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  > * {
    :nth-child(1) {
      margin-right: 10px;
    }
  }
`

export const SortingTitle = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin-left: 6px;
  }
`

export const SortingContainer = styled.div`
  position: absolute;
  display: block;
  width: 220px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 40px 0 rgb(0 0 0 / 12%);
  padding: 20px;
  top: 32px;
  right: 0;
  z-index: 3;

  transition: opacity 0.2s;
  ${defaultTransition};
`

export const SortingItem = styled.div`
  padding: 16px 10px;
  transition: background-color 0.2s;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;

  :hover {
    background-color: #d0d0d0;
  }

  :active {
    background-color: #939393;
  }
`
