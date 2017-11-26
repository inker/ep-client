import React, { PureComponent } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

export default class Routes extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/login"
            component={Login}
          />
        </Switch>
      </Router>
    )
  }
}
