import React, { PureComponent } from 'react'
import {
  // BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
} from 'react-router-dom'

import { ConnectedRouter as Router } from 'react-router-redux'

import Page from '../components/Page'

import LoginPage from '../pages/Auth/Login'
import TopPanel from '../pages/Auth/TopPanel'
import PhonePage from '../pages/Phones'

import history from '../history'


export default class Routes extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <Page>
          <TopPanel />
          <Switch>
            <Route
              path="/login"
              component={LoginPage}
            />
            <Route
              path="/phones"
              component={PhonePage}
            />
          </Switch>
        </Page>
      </Router>
    )
  }
}
