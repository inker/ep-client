import React, { PureComponent } from 'react'
import {
  // BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
} from 'react-router-dom'

import { ConnectedRouter as Router } from 'react-router-redux'

import Page from './components/Page'

import LoginPage from './pages/Auth/Login'
import TopMenu from './pages/Auth/TopMenu'
import PhonePage from './pages/Phones'

import history from './history'


export default class Routes extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <Page>
          <TopMenu />
          <Switch>
            <Route
              path="/login"
              component={LoginPage}
            />
            <Route
              path="/phones"
              component={PhonePage}
            />
            <Redirect
              from="/"
              to="/phones"
            />
          </Switch>
        </Page>
      </Router>
    )
  }
}
