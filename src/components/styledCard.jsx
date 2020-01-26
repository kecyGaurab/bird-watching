import {Card, Typography} from '@material-ui/core'
import styled, {css} from 'styled-components'

export const StyledCard = styled(Card)`
  ${props => {
    return css`
      height: ${props.extended === true ? ' 580px' : '350px'};
    `
  }}
`

export const StyledLink = styled(Typography)`
  ${props => {
    return css`
      padding-top: '8px';
    `
  }}
`
