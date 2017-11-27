import React, { PureComponent } from 'react'
import {
  // BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
} from 'react-router-dom'

import { ConnectedRouter as Router } from 'react-router-redux'

import LoginPage from './pages/Auth/Login'

import history from './history'

export default class Routes extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <div>
          <Link to="/login">Login</Link>
          <Switch>
            <Route
              path="/login"
              component={LoginPage}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}
