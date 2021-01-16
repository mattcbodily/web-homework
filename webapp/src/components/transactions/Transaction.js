import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

const Transaction = ({ transaction }) => {
  return (
    <section css={TransactionStyle}>
      <p css={TransactionAmount}>${transaction.amount}</p>
      <p css={TransactionAmount}>{transaction.debit ? 'Debit' : 'Credit'}</p>
      <p>Description: {transaction.description}<br />Date: {transaction.spendDate}</p>
      <button css={editButtonStyles}>Edit</button>
      <button css={deleteButtonStyles}>Delete</button>
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
  padding: 0 25px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 2px 1px gray;
  display: grid;
  grid-template-rows: 10px 45px 10px;
  grid-template-columns: 15% 20% 35% 12% 10%;
`

const TransactionAmount = css`
  font-size: 24px;
  margin: 0;
  line-height: 65px;
`

const editButtonStyles = css`
  height: 40px;
  width: 100px;
  grid-row: 2;
  grid-column: 4;
`

const deleteButtonStyles = css`
  height: 40px;
  width: 100px;
  grid-row: 2;
  grid-column: 5;
`

export default Transaction
