import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import Expenses from '../expenses/Expenses'
import TransactionForm from '../transactionform/TransactionForm'
import TransactionList from '../transactions/TransactionList'
import { GET_ALL_TRANSACTIONS } from '../../queries/queries'

const Home = ({ history, user }) => {
  const [transactions, setTransactions] = useState([])
  const { data } = useQuery(GET_ALL_TRANSACTIONS)

  useEffect(() => {
    if (!user.user_id) {
      history.push('/')
    }
  }, [])

  useEffect(() => {
    if (data && data.transactions) {
      setTransactions(data.transactions)
    }
  }, [data])

  return (
    <section css={HomeLayout} data-testid='home'>
      <div css={FlexStyles}>
        <Expenses transactions={transactions} />
        <TransactionForm />
      </div>
      <TransactionList transactions={transactions} />
    </section>
  )
}

Home.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object
}

const HomeLayout = css`
  height: 100vh;
  box-sizing: border-box;
  margin: 0 auto;
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

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Home)
