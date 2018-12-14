import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// User will be allowed to navigate to private routes if it has logged in already.
// Otherwise, the /login page will be displayed
function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => (
      rest.authedUser
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )}/>
  )
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(PrivateRoute)