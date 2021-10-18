import styled from 'styled-components'
import {MEDIA_QUERIES} from 'constants/mediaQueriesList'


export const LanguagesSelectContainer = styled.div`
  position: fixed;
  right: 15px;
  bottom: 30px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 2px 40px 0 rgb(0 0 0 / 12%);
  font-weight: 500;
  font-size: 18px;
  align-items: flex-start;
  z-index: 9;
  background-color: #fff;
  transition: all 0.2s ease-in-out;
  :hover, :active {
    box-shadow: 0 6px 40px 0 rgb(0 0 0 / 30%);
  }
  
  ${MEDIA_QUERIES.md} {
    padding: 5px;
    font-size: 14px;
    bottom: 20px;
  }
`

export const Languages = styled.div`
  display: ${props => props.open ? 'flex' : 'none'};
  flex-direction: column;
  gap: 10px;
`

export const Language = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
`

export const ActiveLanguage = styled(Language)`
  display: flex;
  gap: 8px;
  align-items: center;

  svg {
    transition: all 0.2s ease-in-out;
    transform: ${props => props.open ? 'rotate(0deg)' : 'rotate(180deg)'};
  }

`
