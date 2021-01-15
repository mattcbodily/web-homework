import React from 'react'
import { css } from '@emotion/core'
import TransactionForm from '../transactionform/TransactionForm'
import ExpenseChart from '../expensechart/ExpenseChart'

export function Home () {
  return (
    <section css={HomeLayout}>
      <TransactionForm />
      <ExpenseChart />
    </section>
  )
}

const HomeLayout = css`
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 5vw;
`
