import React from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'
import divvyLogo from '../assets/divvy-logo.png'

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
            <Link css={itemStyle} to='/another'>Transactions</Link>
          </li>
          <li>
            <Link css={itemStyle} to='/another'>Settings</Link>
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
    background: white;
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
    width: 350px;
    ul {
        display: flex;
        justify-content: space-between;
        list-style-type: none;
    }
`
const itemStyle = css`
    color: black;
    font-size: 20px;
    font-weight: 500;
    text-decoration: none;
`
