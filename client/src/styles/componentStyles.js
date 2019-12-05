import styled from 'styled-components'
import { Button, TextField, CircularProgress } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

export const CustomAutoComplete = styled(Autocomplete)`
  width: 50vw;
  font-size: 1.8rem;
  color: white;
  & input,
  & label {
    color: white !important;
    font-weight: bold;
  }
  & svg {
    height: 2.5rem;
    width: 2.5rem;
    fill: white;
  }
`

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
  width: 90%;
  margin: 2rem auto !important;
  & input,
  & label,
  & p {
    border-color: white !important;
    font-size: 1.6rem !important;
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

const getColor = props => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isDragActive) {
    return '#2196f3'
  }
  return '#bbb'
}

export const DropZoneContainer = styled.div`
  min-height: 30vh;
  min-width: 70vw;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 5px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #777;
  outline: none;
  transition: border 0.24s ease-in-out;
`

export const ThumbnailList = styled.div`
  width: 70vw;
  margin: 1.5rem auto;
  display: grid;
  grid-template-columns: repeat(5, 12rem);
  grid-auto-rows: 15rem;
  grid-gap: 1.5rem;
`

export const ThumbnailListItem = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 5px solid green;
  margin: 0 1rem 1rem 0;
  padding: 1;
  & img {
    width: 100%;
    height: 100%;
  }
`

export const BackButton = styled.span`
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  top: 3rem;
  left: 3rem;
`
