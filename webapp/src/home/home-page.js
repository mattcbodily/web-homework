import React from 'react'
import { css } from '@emotion/core'
import TransactionForm from '../transactionform/TransactionForm'

export function Home () {
  return (
    <section css={HomeLayout}>
      <TransactionForm />
    </section>
  )
}

const HomeLayout = css`
  display: grid;
`
