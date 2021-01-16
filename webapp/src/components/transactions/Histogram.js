import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Bar } from 'react-chartjs-2'

const Histogram = ({ transactions }) => {
  const [chartType, setChartType] = useState('day')
  const [days, setDays] = useState([])
  const [dailyAmounts, setDailyAmounts] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryAmounts, setCategoryAmounts] = useState([])

  useEffect(() => {
    if (chartType === 'day' && transactions.length) {
      const dayList = []
      const dailySpend = []

      transactions.forEach(el => {
        if (!dayList.includes(el.spendDate)) {
          dayList.push(el.spendDate)
        }
      })

      dayList.forEach(el => {
        const sum = transactions.filter(transaction => transaction.spendDate === el).reduce((acc, curr) => acc + curr.amount, 0)
        dailySpend.push(sum)
      })

      setDays(dayList)
      setDailyAmounts(dailySpend)
    } else if (chartType === 'category' && transactions.length) {
      const categoryList = []
      const categorySpend = []

      transactions.forEach(el => {
        if (!categoryList.includes(el.category)) {
          categoryList.push(el.category)
        }
      })

      categoryList.forEach(el => {
        const sum = transactions.filter(transaction => transaction.category === el).reduce((acc, curr) => acc + curr.amount, 0)
        categorySpend.push(sum)
      })

      setCategories(categoryList)
      setCategoryAmounts(categorySpend)
    }
  }, [chartType, transactions.length])

  return (
    <section css={histogramContainer}>
      <h2>Spending Trends</h2>
      <p>View by: <button css={buttonStyles} onClick={() => setChartType('day')}>Date</button> <button css={buttonStyles} onClick={() => setChartType('category')}>Category</button></p>
      <Bar
        data={{
          labels: chartType === 'day' ? days : categories,
          datasets: [{
            backgroundColor: '#159f6d',
            data: chartType === 'day' ? dailyAmounts : categoryAmounts
          }]
        }}
        height={78}
        options={{
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }} />
    </section>
  )
}

Histogram.propTypes = {
  transactions: PropTypes.array
}

const histogramContainer = css`
  box-sizing: border-box;
  height: 41vh;
  width: 100%;
  padding: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 2px 1px gray;
`

const buttonStyles = css`

`

export default Histogram
