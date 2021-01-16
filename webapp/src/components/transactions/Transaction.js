import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

const Transaction = ({ transaction }) => {
  return (
    <section css={TransactionStyle}>
      <p css={TransactionAmount}>${transaction.amount}</p>
      <p css={TransactionAmount}>{transaction.debit ? 'Debit' : 'Credit'}</p>
      <p>Category: {transaction.category}<br />Date: {transaction.spendDate}</p>
    </section>
  )
}

Transaction.propTypes = {
  transaction: PropTypes.object
}

const TransactionStyle = css`
  box-sizing: border-box;
  height: 65px;
  width: 100%;
  margin-top: 20px;
  padding: 0 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 2px 1px gray;
  display: grid;
  grid-template-rows: 65px;
  grid-template-columns: 15% 15% 25% 25%;
`

const TransactionAmount = css`
  font-size: 24px;
  margin: 0;
  line-height: 65px;
`

export default Transaction
