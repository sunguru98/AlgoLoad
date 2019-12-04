import React from 'react'

import { withRouter } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { CustomButton } from '../styles/componentStyles'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectAuthUser } from '../redux/selectors/authSelectors'
import { logOutUser } from '../redux/actions/authActions'

const NavBar = ({ user, logOutUser, history }) => {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            onClick={() => history.push('/')}
            variant='h3'
            style={{ flexGrow: 1, cursor: 'pointer' }}>
            AlgoLoad
          </Typography>
          {user ? (
            <React.Fragment>
              <CustomButton onClick={logOutUser} navbutton='true'>
                Logout
              </CustomButton>
              <CustomButton
                onClick={() => history.push('/upload')}
                style={{ marginLeft: '2rem' }}
                navbutton='true'
                primary='true'>
                Upload
              </CustomButton>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <CustomButton
                primary='true'
                navbutton='true'
                onClick={() => history.push('/login')}>
                Login
              </CustomButton>
              <CustomButton
                onClick={() => history.push('/register')}
                style={{ marginLeft: '2rem' }}
                navbutton='true'>
                Register
              </CustomButton>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser
})

const mapDispatchToProps = dispatch => ({
  logOutUser: () => dispatch(logOutUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
