import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Doughnut } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { css } from '@emotion/core'
import { romanize } from '../../helpers/helpers'

const Expenses = ({ transactions, romanNumeralSetting, darkMode }) => {
  const [totalSpend, setTotalSpend] = useState(0)
  const [debitSpend, setDebitSpend] = useState(0)
  const [creditSpend, setCreditSpend] = useState(0)

  useEffect(() => {
    const allSum = transactions.reduce((acc, curr) => acc + curr.amount, 0)
    const debitSum = transactions.filter(el => el.debit).reduce((acc, curr) => acc + curr.amount, 0)
    const creditSum = transactions.filter(el => el.credit).reduce((acc, curr) => acc + curr.amount, 0)

    setTotalSpend(allSum.toFixed(2))
    setDebitSpend(debitSum.toFixed(2))
    setCreditSpend(creditSum.toFixed(2))
  }, [transactions])

  return (
    <section css={darkMode ? [expensesStyles, darkModeStyles] : expensesStyles}>
      <div css={spendDataStyles}>
        <h2>Total Expenses</h2>
        <p css={totalSpendStyles}>${romanNumeralSetting ? romanize(totalSpend) : totalSpend}</p>
        <div css={boxFlex}>
          <div css={debitBox} />
          <p>Debit: ${romanNumeralSetting ? romanize(debitSpend) : debitSpend}</p>
        </div>
        <div css={boxFlex}>
          <div css={creditBox} />
          <p>Credit: ${romanNumeralSetting ? romanize(creditSpend) : creditSpend}</p>
        </div>
      </div>
      <div css={chartContainer}>
        <Doughnut
          data={{
            labels: ['Debit', 'Credit'],
            datasets: [{
              backgroundColor: ['#247ba0', '#159f6d'],
              data: [debitSpend, creditSpend]
            }]
          }}
          height={300}
          options={{
            legend: {
              display: false
            }
          }} />
      </div>
    </section>
  )
}

Expenses.propTypes = {
  transactions: PropTypes.array,
  romanNumeralSetting: PropTypes.bool,
  darkMode: PropTypes.bool
}

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
  justify-content: space-between;
  align-items: center;

  h2 {
    margin-top: 15px;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }
`

const spendDataStyles = css`
  height: 100%;
`

const totalSpendStyles = css`
  font-size: 45px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 15px 0;
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

const boxFlex = css`
  display: flex;
  align-items: center;
`

const chartContainer = css`
  width: 45%;
`

const darkModeStyles = css`
  background: #1c2541;
`

const mapStateToProps = reduxState => {
  return {
    romanNumeralSetting: reduxState.user.romanNumeralSetting,
    darkMode: reduxState.user.darkMode
  }
}

export default connect(mapStateToProps)(Expenses)
