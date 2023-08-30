import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Layout } from './ext-src/Layout.jsx'

import createAuthRequiredPage from "./auth/pages/createAuthRequiredPage"

import LoginPage from './ext-src/pages/auth/Login.jsx'
import SignupPage from './ext-src/pages/auth/Signup.jsx'
import { Dashboard as DashboardPage } from './ext-src/pages/Dashboard.jsx'
import { Task as TaskPage } from './ext-src/pages/Task.jsx'


const router = (
  <Router>
    <Layout>
    <Switch>
      <Route exact path="/login" component={ LoginPage }/>
      <Route exact path="/signup" component={ SignupPage }/>
      <Route exact path="/" component={ createAuthRequiredPage(DashboardPage) }/>
      <Route exact path="/task/:taskId" component={ createAuthRequiredPage(TaskPage) }/>
    </Switch>
    </Layout>
  </Router>
)

export default router
