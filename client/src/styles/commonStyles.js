import styled from 'styled-components'

export const MainContainer = styled.section`
  min-height: calc(100vh - 6.4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #00d2ff;
  background: -webkit-linear-gradient(to right, #00d2ff, #3a7bd5);
  background: linear-gradient(to right, #00d2ff, #3a7bd5);

  & .upload-form {
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 37.5em) {
    min-height: calc(100vh - 5.6rem);
    h1 {
      font-size: 2.5rem;
    }
    h1,
    h2,
    small {
      text-align: center;
    }
    h2 {
      width: 60vw;
      font-size: 2rem;
    }
    .upload-form {
      margin: 0 2rem;
    }
  }
`

export const FormContainer = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2.5rem;
  min-height: 60vh;
  min-width: 50vw;
`

export const PortalContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);

  & img {
    animation: zoomIn 0.3s;
  }

  @keyframes zoomIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`
