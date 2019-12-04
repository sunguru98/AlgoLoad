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
import {
  registerUser,
  addErrorMessage,
  clearErrors
} from '../redux/actions/authActions'

const RegisterPage = ({
  user,
  loading,
  errors,
  registerUser,
  addErrorMessage,
  clearErrors
}) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  })

  if (user) return <Redirect to='/dashboard' />

  const { name, email, password, cPassword } = formState
  const handleSubmit = event => {
    event.preventDefault()
    if (password !== cPassword)
      return addErrorMessage({ cPassword: 'Passwords do not match' })
    registerUser({ email, password, name })
  }

  const handleChange = event => {
    clearErrors()
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  return (
    <MainContainer>
      <FormContainer>
        <h2 style={{ textAlign: 'center' }}>Join us !</h2>
        <CustomForm onSubmit={handleSubmit}>
          <CustomTextField
            error={
              errors && errors.find(err => err.hasOwnProperty('name'))
                ? true
                : false
            }
            helperText={
              errors && errors.find(err => err.hasOwnProperty('name'))
                ? errors.find(err => err.hasOwnProperty('name')).name
                : null
            }
            required
            variant='outlined'
            label='Name'
            type='text'
            value={name}
            onChange={handleChange}
            name='name'
          />
          <CustomTextField
            error={
              errors && errors.find(err => err.hasOwnProperty('email'))
                ? true
                : false
            }
            helperText={
              errors && errors.find(err => err.hasOwnProperty('email'))
                ? errors.find(err => err.hasOwnProperty('email')).email
                : null
            }
            required
            variant='outlined'
            label='Email'
            type='email'
            value={email}
            onChange={handleChange}
            name='email'
          />
          <CustomTextField
            error={
              errors && errors.find(err => err.hasOwnProperty('password'))
                ? true
                : false
            }
            helperText={
              errors && errors.find(err => err.hasOwnProperty('password'))
                ? errors.find(err => err.hasOwnProperty('password')).password
                : null
            }
            required
            variant='outlined'
            label='Password'
            type='password'
            value={password}
            onChange={handleChange}
            name='password'
          />
          <CustomTextField
            error={
              errors && errors.find(err => err.hasOwnProperty('cPassword'))
                ? true
                : false
            }
            helperText={
              errors && errors.find(err => err.hasOwnProperty('cPassword'))
                ? 'Passwords do not match'
                : null
            }
            required
            variant='outlined'
            label='Confirm Password'
            value={cPassword}
            type='password'
            onChange={handleChange}
            name='cPassword'
          />
          <CustomButton
            navbutton='false'
            style={{ width: '80%', margin: '1rem auto' }}
            type='submit'
            primary='true'>
            <span style={{ display: 'flex' }}>
              Register{' '}
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
  registerUser: ({ name, email, password }) =>
    dispatch(registerUser({ name, email, password })),

  addErrorMessage: param => dispatch(addErrorMessage(param)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
