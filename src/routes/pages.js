import React, { PureComponent } from 'react'
import {
  // BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import LoginPage from '../pages/Auth/Login'
import PhonePage from '../pages/Phone'

import history from '../history'

export default class Routes extends PureComponent {

  componentDidMount() {
    this.props
    debugger
  }
  componentWillReceiveProps(nextProps) {
    console.log('next', nextProps)
  }

  render() {
    return (
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
    )
  }
}
