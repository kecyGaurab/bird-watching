import {Card} from '@material-ui/core'
import styled, {css} from 'styled-components'

export const StyledCard = styled(Card)`
  ${props => {
    return css`
      height: ${props.extended === true ? ' 580px' : '400px'};
    `
  }}
`
