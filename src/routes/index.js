import React, { PureComponent } from 'react'
import {
  // BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
} from 'react-router-dom'

import { ConnectedRouter as Router } from 'react-router-redux'

import LoginPage from '../pages/Auth/Login'
import TopPanel from '../pages/Auth/TopPanel'
import PhonePage from '../pages/Phone'

import history from '../history'


export default class Routes extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <div>
          <TopPanel />
          <Switch>
            <Route
              path="/login"
              component={LoginPage}
            />
            <Route
              path="/phone"
              component={PhonePage}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}
