import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import Transaction from './Transaction'

const TransactionList = ({ transactions }) => {
  return (
    <section css={TransactionListStyle}>
      <h1>Your Transactions</h1>
      {!transactions
        ? null
        : transactions.map((transaction, i) =>
          <Transaction key={i} transaction={transaction} />
        )}

    </section>
  )
}

TransactionList.propTypes = {
  transactions: PropTypes.array
}

export default TransactionList

const TransactionListStyle = css`
  box-sizing: border-box;
  height: calc(82vh + 20px);
  width: 62vw;
  margin-top: 120px;
`
