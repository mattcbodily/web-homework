import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import Header from './header/Header'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <Header />
        <div className='main-content'>
          <Route component={Home} exact path='/' />
          <Route component={() => (<div>Content for /another route</div>)} exact path='/another' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 100px;
  background: #ededed;
`
