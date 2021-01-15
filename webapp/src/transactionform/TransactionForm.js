import React, { useState } from 'react'
import { css } from '@emotion/core'

export default function TransactionForm () {
  const [userName, setUsername] = useState('')
  const [description, setDescription] = useState('')
  const [debit, setDebit] = useState(false)
  const [credit, setCredit] = useState(false)
  const [amount, setAmount] = useState('')

  const selectPaymentType = (type) => {
    if (type === 'debit') {
      setDebit(true)
      if (credit) {
        setCredit(false)
      }
    } else if (type === 'credit') {
      setCredit(true)
      if (debit) {
        setDebit(false)
      }
    }
  }

  return (
    <form css={formStyles}>
      <label css={labelStyles}>
        Employee
        <input onChange={e => setUsername(e.target.value)} type='text' value={userName} />
      </label>
      <label css={labelStyles}>
        Transaction Description
        <input onChange={e => setDescription(e.target.value)} type='text' value={description} />
      </label>
      <label css={labelStyles}>
        Payment Type
        <div css={buttonGroup}>
          <input css={debit ? activePaymentTypeStyles : passivePaymentTypeStyles} onClick={() => selectPaymentType('debit')} type='button' value='Debit' />
          <input css={credit ? activePaymentTypeStyles : passivePaymentTypeStyles} onClick={() => selectPaymentType('credit')} type='button' value='Credit' />
        </div>
      </label>
      <label css={labelStyles}>
        Payment Amount
        <input onChange={e => setAmount(e.target.value)} type='text' value={amount} />
      </label>
      <button css={ButtonStyles} type='submit'>Submit</button>
    </form>
  )
}

const formStyles = css`
  input {
    margin-top: 5px;
    outline: none;
  }

  input[type=text] {
    height: 35px;
    width: 300px;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 10px;
    font-size: 16px;
  }
`

const labelStyles = css`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
`

const activePaymentTypeStyles = css`
  background: red;
`

const passivePaymentTypeStyles = css`
  background: #fff;
`

const buttonGroup = css`
  input[type=button] {
    height: 35px;
    width: 150px;
    box-sizing: border-box;
    border: none;
    border: 1px solid black;
  }

  input[type=button]:first-child {
    border-radius: 10px 0 0 10px;
    border-right: 1px solid black;
  }

  input[type=button]:last-child {
    border-radius: 0 10px 10px 0;
  }
`

const ButtonStyles = css`
  height: 35px;
  width: 300px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  background: #159f6d;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    background: #117C55
  }
`
