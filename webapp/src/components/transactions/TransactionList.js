import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import Transaction from './Transaction'
import Histogram from './Histogram'

const TransactionList = ({ transactions }) => {
  return (
    <section css={transactionListStyle}>
      {!transactions
        ? null
        : (
          <Fragment>
            <section css={listContainer}>
              <h2>Your Transactions</h2>
              {transactions.length >= 4
                ? <p>Scroll to view more</p>
                : null}
              <section css={scrollBox}>
                {transactions.map((transaction, i) =>
                  <Transaction key={i} transaction={transaction} />
                )}
              </section>
            </section>
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

const transactionListStyle = css`
  box-sizing: border-box;
  height: calc(82vh + 20px);
  width: 62vw;
  margin-top: 120px;

  h2 {
    margin-top: 0;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }
`

const listContainer = css`
  box-sizing: border-box;
  height: 41vh;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 2px 1px gray;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const scrollBox = css`
  box-sizing: border-box;
  width: 100%;
`
