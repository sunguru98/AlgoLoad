import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { MainContainer, FormContainer } from '../styles/commonStyles'
import {
  CustomTextField,
  CustomForm,
  CustomButton,
  Spinner
} from '../styles/componentStyles'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  selectAuthLoading,
  selectAuthErrors,
  selectAuthUser
} from '../redux/selectors/authSelectors'
import { signInUser } from '../redux/actions/authActions'

import { Helmet } from 'react-helmet'

const RegisterPage = ({ user, loading, errors, signInUser }) => {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  if (user) return <Redirect to='/dashboard' />

  const { email, password } = formState
  const handleSubmit = event => {
    event.preventDefault()
    signInUser({ email, password })
  }

  const handleChange = event =>
    setFormState({ ...formState, [event.target.name]: event.target.value })

  return (
    <MainContainer>
      <Helmet><title>AlgoLoad - Login</title></Helmet>
      <FormContainer>
        <h2 style={{ textAlign: 'center' }}>Welcome back !</h2>
        <CustomForm onSubmit={handleSubmit}>
          <CustomTextField
            required
            variant='outlined'
            label='Email'
            type='email'
            value={email}
            onChange={handleChange}
            name='email'
          />
          <CustomTextField
            required
            variant='outlined'
            label='Password'
            type='password'
            value={password}
            onChange={handleChange}
            name='password'
          />
          <CustomButton
            navbutton="false"
            style={{ width: '80%', margin: '1rem auto' }}
            type='submit'
            primary='true'>
            <span style={{ display: 'flex' }}>
              Signin{' '}
              {loading && (
                <Spinner
                  thickness={4}
                  size={25}
                  style={{ marginLeft: '2rem' }}
                />
              )}
            </span>
          </CustomButton>
        </CustomForm>
      </FormContainer>
    </MainContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  errors: selectAuthErrors,
  user: selectAuthUser
})

const mapDispatchToProps = dispatch => ({
  signInUser: ({ email, password }) => dispatch(signInUser({ email, password }))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
