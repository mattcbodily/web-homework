import React from 'react'
import { css } from '@emotion/core'

const Expenses = () => {
  return (
    <section css={ExpensesStyles}>Expenses</section>
  )
}

export default Expenses

const ExpensesStyles = css`
    height: 30vh;
    width: 30vw;
    background: white;
    margin: 20px 0;
    border-radius: 5px;
    box-shadow: 0 0 2px 1px gray;
`
