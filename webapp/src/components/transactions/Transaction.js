import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import TransactionForm from '../transactionform/TransactionForm'
import { DELETE_TRANSACTION, GET_ALL_TRANSACTIONS } from '../../queries/queries'

const Transaction = ({ transaction }) => {
  const [editView, setEditView] = useState(false)
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION)

  const removeTransaction = () => {
    deleteTransaction({
      variables: {
        transaction_id: transaction.transactionId
      },
      refetchQueries: [{ query: GET_ALL_TRANSACTIONS }]
    })
  }

  return (
    <section css={TransactionStyle}>
      <p css={TransactionAmount}>${transaction.amount}</p>
      <p css={TransactionAmount}>{transaction.debit ? 'Debit' : 'Credit'}</p>
      <p>Description: {transaction.description}<br />Date: {transaction.spendDate}</p>
      {editView
        ? <button css={editButtonStyles} onClick={() => setEditView(false)}>Cancel</button>
        : <button css={editButtonStyles} onClick={() => setEditView(true)}>Edit</button>}
      <button css={deleteButtonStyles} onClick={removeTransaction}>Delete</button>
      {editView
        ? (
          <TransactionForm editView='true' setEditView={setEditView} transaction={transaction} />
        )
        : null}
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
  grid-template-columns: 15% 20% 35% 13% 10%;

  button {
    box-sizing: border-box;
    height: 40px;
    width: 100px;
    background: transparent;
    border: 2px solid black;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: 200ms;

    &:hover {
      color: white;
    }
  }
`

const TransactionAmount = css`
  font-size: 24px;
  margin: 0;
  line-height: 65px;
`

const editButtonStyles = css`
  grid-row: 2;
  grid-column: 4;

  &:hover {
    background: #ffb627;
  }
`

const deleteButtonStyles = css`
  grid-row: 2;
  grid-column: 5;

  &:hover {
    background: #fc440f;
  }
`

export default Transaction
