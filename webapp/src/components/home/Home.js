import React from 'react'
import { css } from '@emotion/core'
import Expenses from '../expenses/Expenses'
import TransactionForm from '../transactionform/TransactionForm'
import Transactions from '../transactions/Transactions'

const Home = () => {
  return (
    <section css={HomeLayout}>
      <div css={FlexStyles}>
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
  padding-top: 100px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 3vw;
`

const FlexStyles = css`
  height: 100vh;
  box-sizing: border-box;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
`

export default Home
