import React from 'react'
import { css } from '@emotion/core'

export default function ExpenseChart () {
  return (
    <section css={expenseChartStyles}>
      I am chart, hear me roar
    </section>
  )
}

const expenseChartStyles = css`
    height: 500px;
    width: 400px;
`
