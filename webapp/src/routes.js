import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { css } from '@emotion/core'
import Header from './components/header/Header'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/home/Home'
import Upload from './components/upload/Upload'
import Settings from './components/settings/Settings'

function AppRouter ({ darkMode }) {
  return (
    <Router>
      <div css={darkMode ? [layoutStyle, darkModeStyles] : layoutStyle}>
        <Header />
        <Route component={Login} exact path='/' />
        <Route component={Register} exact path='/register' />
        <Route component={Home} exact path='/home' />
        <Route component={Upload} exact path='/upload' />
        <Route component={Settings} exact path='/settings' />
      </div>
    </Router>
  )
}

AppRouter.propTypes = {
  darkMode: PropTypes.bool
}

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

const darkModeStyles = css`
  background: #0b132b;
  color: white;
`

const mapStateToProps = reduxState => {
  return {
    darkMode: reduxState.user.darkMode
  }
}

export default connect(mapStateToProps)(AppRouter)
