import React from 'react'
import { css } from '@emotion/core'
import Expenses from '../expenses/Expenses'
import TransactionForm from '../transactionform/TransactionForm'
import Transactions from '../transactions/Transactions'

const Home = () => {
  return (
    <section css={HomeLayout}>
      <div>
        <Expenses />
        <TransactionForm />
      </div>
      <Transactions />
    </section>
  )
}

const HomeLayout = css`
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;
`

export default Home
