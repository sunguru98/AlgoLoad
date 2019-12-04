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

const App = () => {
  // Setting default headers after login
  Axios.defaults.headers.common['Authorization'] = localStorage.getItem(
    'accessToken'
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

export default App
