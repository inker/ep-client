import React, { PureComponent } from 'react'
import {
  // BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import { ConnectedRouter as Router } from 'react-router-redux'

import LoginPage from './pages/Auth/Login'

import history from './history'

export default class Routes extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/login"
            component={LoginPage}
          />
        </Switch>
      </Router>
    )
  }
}
