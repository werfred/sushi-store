import styled from 'styled-components'


export const FiltersArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  > * + * {
    margin-top: 40px;
  }
`
