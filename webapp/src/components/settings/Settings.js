import React, { useState } from 'react'
import { css } from '@emotion/core'

const Settings = () => {
  const [romanNumerals, setRomanNumerals] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleRomanNumerals = () => {
    setRomanNumerals(!romanNumerals)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <section css={settingsStyle}>
      <h1>Settings</h1>
      <p>Display numbers as roman numerals</p>
      <div css={toggleStyles}>
        <input checked={romanNumerals} css={inputStyles} onChange={toggleRomanNumerals} type='checkbox' />
        <span css={sliderStyles} />
      </div>
      <p>Dark Mode</p>
      <div css={toggleStyles}>
        <input checked={darkMode} css={inputStyles} onChange={toggleDarkMode} type='checkbox' />
        <span css={sliderStyles} />
      </div>
    </section>
  )
}

const settingsStyle = css`
  min-height: 100vh;
  padding: 120px;
`

const toggleStyles = css`
  position: relative;
  &:after {
    content: '';
    font-size: 18px;
    position: absolute;
    top: 7px;
    left: 37px;
  }

  &:before {
    content: '';
    font-size: 18px;
    position: absolute;
    top: 7px;
    left: 6px;
    z-index: 1;
  }
`

const inputStyles = css`
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
  
  &:hover + span:after {
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.2);
  }
  
  &:checked + span {
    background: #3a9df8;
    &:after {
      transform: translate3d(32px, 0, 0);
    }
  }
`

const sliderStyles = css`
  position: relative;
  display: block;
  height: 32px;
  width: 64px;
  border-radius: 32px;
  transition: 0.25s ease-in-out;
  background: #4a5b90;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.15);

  &:after {
    content: '';
    position: absolute;
    border-radius: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transition: 0.25s ease-in-out;
    width: 32px;
    height: 32px;
  }
`

export default Settings
