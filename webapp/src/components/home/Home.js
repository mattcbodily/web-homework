import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import Expenses from '../expenses/Expenses'
import TransactionForm from '../transactionform/TransactionForm'
import TransactionList from '../transactions/TransactionList'
import { GET_ALL_TRANSACTIONS } from '../../queries/queries'

const Home = () => {
  const [transactions, setTransactions] = useState([])
  const { data } = useQuery(GET_ALL_TRANSACTIONS)

  useEffect(() => {
    if (data && data.transactions) {
      setTransactions(data.transactions)
    }
  }, [data])

  return (
    <section css={HomeLayout}>
      <div css={FlexStyles}>
        <Expenses transactions={transactions} />
        <TransactionForm />
      </div>
      <TransactionList transactions={transactions} />
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
