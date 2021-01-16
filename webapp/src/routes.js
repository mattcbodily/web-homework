import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import Header from './components/header/Header'
import Home from './components/home/Home'
import Settings from './components/settings/Settings'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <Header />
        <Route component={Home} exact path='/' />
        <Route component={Settings} exact path='/settings' />
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
  min-height: 100vh;
  background: #E4E4E4;
  font-family: Open-sans, arial;

  *::-webkit-scrollbar {
    display: none;
  }
  
  * {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`
