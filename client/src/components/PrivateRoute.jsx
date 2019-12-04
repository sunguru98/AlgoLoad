import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectAuthUser } from '../redux/selectors/authSelectors'

import { Redirect, Route } from 'react-router-dom'

// Custom Route component to protect routes
const PrivateRoute = ({ user, component: Component, ...restProps }) => {
  return !user ? (
    <Redirect to='/login' />
  ) : (
    <Route
      {...restProps}
      render={routeProps => <Component {...routeProps} />}
    />
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser
})

export default connect(mapStateToProps)(PrivateRoute)
