import React from 'react'
import { css } from '@emotion/core'

const Transactions = () => {
  return (
    <section css={TransactionsStyle}>
      <h1>Your Transactions</h1>
    </section>
  )
}

export default Transactions

const TransactionsStyle = css`
  box-sizing: border-box;
  height: calc(82vh + 20px);
  width: 62vw;
  margin-top: 120px;
`
