import React from 'react'
import Axios from 'axios'

import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import NavBar from './components/NavBar'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import UploadsPage from './pages/UploadsPage'

import { connect } from 'react-redux'
import { logOutUser } from './redux/actions/authActions'

const App = ({ logOutUser }) => {
  // Setting default headers after login
  Axios.defaults.headers.common['Authorization'] = localStorage.getItem(
    'accessToken'
  )

  Axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.data.statusCode === 401) logOutUser()
    }
  )

  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      <NavBar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        {/* Custom Route component for Route guards */}
        <PrivateRoute exact path='/upload' component={UploadsPage} />
        <PrivateRoute exact path='/dashboard' component={DashboardPage} />
      </Switch>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  logOutUser: () => dispatch(logOutUser())
})

export default connect(null, mapDispatchToProps)(App)
