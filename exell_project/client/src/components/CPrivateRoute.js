import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// Origin https://reactrouter.com/web/example/auth-workflow
function PrivateRoute({ children, auth, ...rest }) {

    console.log('auth')
    console.log(auth)

    return (
      <Route
        {...rest}
        // Rendering depends on auth.user state - render children if exist or redirect to login page if not
        // https://ru.reactjs.org/docs/render-props.html
        render={({ location, redirectTo }) =>
            JSON.parse(localStorage.getItem('profile')) ? (
            // !!auth.authData ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: redirectTo,
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  const CPrivateRoute = connect( state => ({ auth: state.auth }) )(PrivateRoute)
  
  export default CPrivateRoute
