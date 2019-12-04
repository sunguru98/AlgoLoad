import styled from 'styled-components'
import { Button, TextField, CircularProgress } from '@material-ui/core'

export const CustomButton = styled(Button)`
  color: white !important;
  & span {
    font-size: ${({ navbutton }) =>
      navbutton === 'false' ? '1.6rem' : '1.3rem'} !important;
  }
  padding: 1rem 2rem !important;
  background: ${({ primary }) =>
    primary === 'true' ? '#2ecc71' : '#ff4d4d'} !important;
`

export const CustomTextField = styled(TextField)`
  display: block;
  width: 80%;
  margin: 2rem auto !important;
  & input,
  & label,
  & p {
    font-size: 1.4rem !important;
  }
`

export const CustomForm = styled.form`
  width: 100%;
  margin: 1rem 0 auto;
  display: flex;
  flex-direction: column;
`

export const Spinner = styled(CircularProgress)`
  color: white !important;
  & circle {
  }
`
