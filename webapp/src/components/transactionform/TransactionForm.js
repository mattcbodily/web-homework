import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { connect } from 'react-redux'
import { css } from '@emotion/core'
import { v4 as uuidv4 } from 'uuid'
import { ADD_TRANSACTION, UPDATE_TRANSACTION, GET_ALL_TRANSACTIONS } from '../../queries/queries'
import { validateUploadData } from '../../helpers/helpers'
import { selectPaymentType } from './TransactionFormLogic'

const TransactionForm = ({ editView, setEditView, transaction, userId, darkMode }) => {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [debit, setDebit] = useState(true)
  const [credit, setCredit] = useState(false)
  const [merchantID, setMerchantID] = useState('')
  const [addTransaction] = useMutation(ADD_TRANSACTION)
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION)

  useEffect(() => {
    if (transaction && editView) {
      setAmount(transaction.amount.toString())
      setDescription(transaction.description)
      setCategory(transaction.category)
      setDate(transaction.spendDate)
      setDebit(transaction.debit)
      setCredit(transaction.credit)
      setMerchantID(transaction.merchantID)
    }
  }, [transaction, editView])

  const clearForm = () => {
    setAmount('')
    setDescription('')
    setCategory('')
    setDate('')
    setMerchantID('')
    setDebit(true)
    setCredit(false)
  }

  const submitTransaction = (e) => {
    e.preventDefault()

    const formData = {
      amount: parseFloat(amount),
      description,
      category,
      debit,
      credit,
      merchant_id: merchantID,
      spendDate: date,
      transaction_id: uuidv4(),
      user_id: userId
    }

    const validFormData = validateUploadData([formData])

    if (!validFormData) {
      // To do: add a more stylized alert
      return window.alert('Please fill out all transaction form inputs')
    }

    addTransaction({
      variables: formData,
      refetchQueries: [{ query: GET_ALL_TRANSACTIONS }]
    })
    clearForm()
  }

  const editTransaction = (e) => {
    e.preventDefault()

    updateTransaction({
      variables: {
        amount: parseFloat(amount),
        description,
        category,
        debit,
        credit,
        merchant_id: merchantID,
        spendDate: date,
        transaction_id: transaction.transactionId
      },
      refetchQueries: [{ query: GET_ALL_TRANSACTIONS }]
    })
    clearForm()
    setEditView(false)
  }

  return (
    <form css={editView === 'true' ? darkModeStyles ? [formStyles, editFormStyles, darkModeStyles] : [formStyles, editFormStyles] : darkMode ? [formStyles, darkModeStyles] : formStyles}>
      {!editView
        ? <h2>Add a Transaction</h2>
        : null}
      <div>
        <label css={labelStyles}>
          Amount
          <input onChange={e => setAmount(e.target.value)} type='number' value={amount} />
        </label>
        <label css={labelStyles}>
          Description
          <input onChange={e => setDescription(e.target.value)} type='text' value={description} />
        </label>
        <label css={labelStyles}>
          Category
          <input onChange={e => setCategory(e.target.value)} type='text' value={category} />
        </label>
        <label css={labelStyles}>
          Date
          <input onChange={e => setDate(e.target.value)} type='date' value={date} />
        </label>
        <label css={labelStyles}>
          Merchant ID
          <input onChange={e => setMerchantID(e.target.value)} type='text' value={merchantID} />
        </label>
        <label css={labelStyles}>
          Payment Type
          <div css={buttonGroup}>
            <input css={debit ? activeDebitStyles : darkMode ? passiveDarkModeBtn : passivePaymentTypeStyles} onClick={() => selectPaymentType('debit', debit, credit, setDebit, setCredit)} type='button' value='Debit' />
            <input css={credit ? activeCreditStyles : darkMode ? passiveDarkModeBtn : passivePaymentTypeStyles} onClick={() => selectPaymentType('credit', debit, credit, setDebit, setCredit, false)} type='button' value='Credit' />
          </div>
        </label>
        {editView
          ? <button css={ButtonStyles} onClick={e => editTransaction(e)} type='submit'>Submit</button>
          : <button css={ButtonStyles} onClick={e => submitTransaction(e)} type='submit'>Submit</button>}
      </div>
    </form>
  )
}

TransactionForm.propTypes = {
  editView: PropTypes.string,
  setEditView: PropTypes.func,
  transaction: PropTypes.object,
  userId: PropTypes.string,
  darkMode: PropTypes.bool
}

const formStyles = css`
  box-sizing: border-box;
  height: 52vh;
  width: 30vw;
  padding: 10px;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 2px 1px gray;

  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  input {
    height: 40px;
    margin-top: 5px;
    outline: none;
  }

  input[type=number], input[type=text], input[type=date] {
    width: 14vw;
    box-sizing: border-box;
    padding: 0 5px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 16px;
  }
`

const editFormStyles = css`
  height: 275px;
  width: 100%;
  margin-top: 20px;

  input[type=number], input[type=text], input[type=date] {
    width: 18vw;
    box-sizing: border-box;
    padding: 0 5px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 16px;
  }

  input[type=button] {
    width: 9vw;
    box-sizing: border-box;
    border: none;
    border: 1px solid black;
    margin-top: 5px;
    font-size: 16px;
  }
`

const labelStyles = css`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
`

const activeDebitStyles = css`
  background: #247ba0;
  color: white;
`

const activeCreditStyles = css`
  background: #159f6d;
  color: white;
`

const passivePaymentTypeStyles = css`
  background: #fff;
`

const buttonGroup = css`
  input[type=button] {
    width: 7vw;
    box-sizing: border-box;
    border: none;
    border: 1px solid black;
    margin-top: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  input[type=button]:first-of-type {
    border-radius: 5px 0 0 5px;
    border-right: 1px solid black;
  }

  input[type=button]:last-child {
    border-radius: 0 5px 5px 0;
  }
`

const ButtonStyles = css`
  height: 40px;
  width: 7vw;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 15px;
  border: 2px solid black;
  background: #159f6d;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    background: #117852;
  }
`

const darkModeStyles = css`
  background: #1c2541;

  input[type=number], input[type=text], input[type=date] {
    background: #3a506b;
    color: white;
  }

  button {
    border-color: white;
    color: white;
  }
`

const passiveDarkModeBtn = css`
  background: #3a506b;
  color: white;
`

const mapStateToProps = reduxState => {
  return {
    userId: reduxState.user.user_id,
    darkMode: reduxState.user.darkMode
  }
}

export default connect(mapStateToProps)(TransactionForm)
