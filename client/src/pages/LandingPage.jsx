import React from 'react'

import { ButtonsContainer } from '../styles/landingPageStyles'
import { MainContainer } from '../styles/commonStyles'
import { CustomButton } from '../styles/componentStyles'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectAuthUser } from '../redux/selectors/authSelectors'

import { Redirect } from 'react-router-dom'

const LandingPage = ({ history, user }) => {
  if (user) return <Redirect to='/dashboard' />
  return (
    <MainContainer>
      <h1 style={{ color: 'white' }}>AlgoLoad</h1>
      <h2 style={{ margin: '2rem 0', color: 'white' }}>
        Convert / Search Text in Images
      </h2>
      <ButtonsContainer>
        <CustomButton onClick={() => history.push('/login')} primary='true'>
          Login
        </CustomButton>
        <CustomButton onClick={() => history.push('/register')}>
          Register
        </CustomButton>
      </ButtonsContainer>
    </MainContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser
})

export default connect(mapStateToProps)(LandingPage)
