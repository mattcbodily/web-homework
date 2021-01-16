import React, { useState, Fragment } from 'react'
import { css } from '@emotion/core'

const Settings = () => {
  let [numInput, setNumInput] = useState('')
  let [romanNumeral, setRomanNumeral] = useState('')

  const romanize = () => {
    if (numInput) {
      const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }
      let roman = ''
      let i
      for (i in lookup) {
        while (numInput >= lookup[i]) {
          roman += i
          numInput -= lookup[i]
        }
      }
      setRomanNumeral(roman)
      setNumInput('')
    }
  }

  return (
    <section css={settingsStyle}>
      <h2>Welcome to the settings page!</h2>
      <p>This is the future home of incredible features such as this:</p>
      <div>
        <h3>Turn your numbers into roman numerals</h3>
        <input id='num-input' onChange={e => setNumInput(e.target.value)} type='number' value={numInput} />
        <button id='romanize-btn' onClick={romanize}>Romanize</button>
        {romanNumeral
          ? (
            <Fragment>
              <p id='roman-numeral'>Roman Numeral: {romanNumeral}</p>
              <p>DISCLAIMER: This developers knowledge of roman numerals is limited to <br />Super Bowl numbers and Star Wars episodes. Just kidding.</p>
            </Fragment>
          )
          : null}
      </div>
    </section>
  )
}

const settingsStyle = css`
  min-height: 100vh;
  padding: 120px;

  input {
    box-sizing: border-box;
    height: 30px;
    width: 150px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid black;
  }

  button {
    box-sizing: border-box;
    height: 30px;
    width: 75px;
    background: white;
    border-radius: 5px;
    border: 2px solid black;
    cursor: pointer;
  }
`

export default Settings
