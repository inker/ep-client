import React, { PureComponent } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import LoginPage from './pages/Auth/Login'

export default class Routes extends PureComponent {
  render() {
    return (
      <Router>
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
