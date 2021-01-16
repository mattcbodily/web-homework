import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import Transaction from './Transaction'
import Histogram from './Histogram'

const TransactionList = ({ transactions }) => {
  return (
    <section css={TransactionListStyle}>
      {!transactions
        ? null
        : (
          <Fragment>
            <section css={ListContainer}>
              <h1>Your Transactions</h1>
              {transactions.map((transaction, i) =>
                <Transaction key={i} transaction={transaction} />
              )}
            </section>
            <h1>Spending Trends</h1>
            <Histogram transactions={transactions} />
          </Fragment>
        )
      }
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

  h1 {
    font-size: 30px;
    margin-top: 0;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }
`

const ListContainer = css`
  height: 41vh;
`
