import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Doughnut } from 'react-chartjs-2'
import { css } from '@emotion/core'

const Expenses = ({ transactions }) => {
  const [totalSpend, setTotalSpend] = useState(0)
  const [debitSpend, setDebitSpend] = useState(0)
  const [creditSpend, setCreditSpend] = useState(0)

  useEffect(() => {
    const allSum = transactions.reduce((acc, curr) => acc + curr.amount, 0)
    const debitSum = transactions.filter(el => el.debit).reduce((acc, curr) => acc + curr.amount, 0)
    const creditSum = transactions.filter(el => el.credit).reduce((acc, curr) => acc + curr.amount, 0)

    setTotalSpend(allSum)
    setDebitSpend(debitSum)
    setCreditSpend(creditSum)
  }, [transactions.length])

  return (
    <section css={expensesStyles}>
      <div>
        <h1>Total Expenses</h1>
        <p css={totalSpendStyles}>${totalSpend}</p>
        <div css={debitBox} />
        <p>Debit: ${debitSpend}</p>
        <div css={creditBox} />
        <p>Credit: ${creditSpend}</p>
      </div>
      <div css={chartContainer}>
        <Doughnut
          data={{
            datasets: [{
              backgroundColor: ['#247ba0', '#159f6d'],
              data: [debitSpend, creditSpend]
            }]
          }}
          height={275} />
      </div>
    </section>
  )
}

Expenses.propTypes = {
  transactions: PropTypes.array
}

export default Expenses

const expensesStyles = css`
    box-sizing: border-box;
    height: 30vh;
    width: 30vw;
    background: white;
    margin: 20px 0;
    padding: 0 20px;
    border-radius: 5px;
    box-shadow: 0 0 2px 1px gray;
    display: flex;
    justify-content: space-around;
    align-items: center;

    h1 {
      font-size: 25px;
      letter-spacing: 1px;
    }
`

const totalSpendStyles = css`
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 1px;
`

const debitBox = css`
  height: 14px;
  width: 14px;
  background: #247ba0;
  display: inline-block;
  margin-right: 5px;
`

const creditBox = css`
  height: 14px;
  width: 14px;
  background: #159f6d;
  display: inline-block;
  margin-right: 5px;
`

const chartContainer = css`
  width: 40%;
`
