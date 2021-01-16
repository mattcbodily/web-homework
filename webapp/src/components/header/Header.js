import React from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'
import divvyLogo from '../../assets/divvy-logo.png'

export default function Header () {
  return (
    <header css={headerStyle}>
      <section css={logoStyle}>
        <img alt='Divvy Logo' src={divvyLogo} />
        <h1>Divvy Challenge</h1>
      </section>
      <nav css={navStyle}>
        <ul>
          <li>
            <Link css={itemStyle} to='/'>Home</Link>
          </li>
          <li>
            <Link css={itemStyle} to='/upload'>Upload</Link>
          </li>
          <li>
            <Link css={itemStyle} to='/settings'>Settings</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
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
