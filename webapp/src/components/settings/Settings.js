import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { connect } from 'react-redux'
import { css } from '@emotion/core'
import { UPDATE_ROMAN_SETTING, UPDATE_DARK_MODE } from '../../queries/queries'
import { clearUser, updateRomanSetting, updateDarkMode } from '../../redux/userReducer'

const Settings = ({ userId, romanNumeralSetting, darkModeSetting, clearUser, updateRomanSetting, updateDarkMode, history }) => {
  const [romanNumerals, setRomanNumerals] = useState(romanNumeralSetting)
  const [darkMode, setDarkMode] = useState(darkModeSetting)
  const [romanSettingMutation] = useMutation(UPDATE_ROMAN_SETTING)
  const [darkModeMutation] = useMutation(UPDATE_DARK_MODE)

  useEffect(() => {
    if (!userId) {
      history.push('/')
    }
  }, [])

  const toggleRomanNumerals = () => {
    romanSettingMutation({ variables: { user_id: userId, romanNumeralSetting: !romanNumerals } })
    updateRomanSetting(!romanNumerals)
    setRomanNumerals(!romanNumerals)
  }

  const toggleDarkMode = () => {
    darkModeMutation({ variables: { user_id: userId, darkMode: !darkMode } })
    updateDarkMode(!darkMode)
    setDarkMode(!darkMode)
  }

  const logoutUser = () => {
    clearUser()
    history.push('/')
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
      <button onClick={logoutUser}>Logout</button>
    </section>
  )
}

Settings.propTypes = {
  userId: PropTypes.string,
  romanNumeralSetting: PropTypes.bool,
  darkModeSetting: PropTypes.bool,
  clearUser: PropTypes.func,
  updateRomanSetting: PropTypes.func,
  updateDarkMode: PropTypes.func,
  history: PropTypes.object
}

const settingsStyle = css`
  min-height: 100vh;
  padding: 120px;
`

const toggleStyles = css`
  position: relative;
  margin-bottom: 35px;

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

const mapStateToProps = reduxState => {
  return {
    userId: reduxState.user.user_id,
    romanNumeralSetting: reduxState.user.romanNumeralSetting,
    darkModeSetting: reduxState.user.darkMode
  }
}

export default connect(mapStateToProps, { clearUser, updateRomanSetting, updateDarkMode })(Settings)
