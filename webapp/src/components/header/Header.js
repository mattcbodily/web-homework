import React from 'react'
import Proptypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { css } from '@emotion/core'
import divvyLogo from '../../assets/divvy-logo.png'

const Header = ({ location, user }) => {
  return (
    <header css={headerStyle}>
      <section css={logoStyle}>
        <img alt='Divvy Logo' src={divvyLogo} />
        {location.pathname !== '/' && location.pathname !== '/register'
          ? <h1>Welcome, {user.firstName} {user.lastName}</h1>
          : <h1>Divvy Challenge</h1>}
      </section>
      {location.pathname !== '/' && location.pathname !== '/register'
        ? (
          <nav css={navStyle}>
            <ul>
              <li>
                <Link css={location.pathname === '/home' ? [itemStyle, activeLinkStyle] : itemStyle} to='/home'>Home</Link>
              </li>
              <li>
                <Link css={location.pathname === '/upload' ? [itemStyle, activeLinkStyle] : itemStyle} to='/upload'>Upload</Link>
              </li>
              <li>
                <Link css={location.pathname === '/settings' ? [itemStyle, activeLinkStyle] : itemStyle} to='/settings'>Settings</Link>
              </li>
            </ul>
          </nav>
        )
        : null}
    </header>
  )
}

Header.propTypes = {
  location: Proptypes.object,
  user: Proptypes.object
}

const headerStyle = css`
  height: 100px;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 75px;
  background: black;
  color: white;
  box-shadow: 0 2px 2px gray;
`

const logoStyle = css`
  height: 100%;
  display: flex;
  align-items: center;
  img {
    height: 45px;
    margin-right: 5px;
  }
`

const navStyle = css`
  width: 275px;
    
  ul {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
  }
`
const itemStyle = css`
  color: white;
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
`

const activeLinkStyle = css`
  text-decoration: underline;
`

const mapStateToProps = reduxState => reduxState

export default withRouter(connect(mapStateToProps)(Header))
