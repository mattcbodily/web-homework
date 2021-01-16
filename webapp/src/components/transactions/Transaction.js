import React from 'react'
import PropTypes from 'prop-types'

const Transaction = ({ transaction }) => {
  return (
    <section>
      <p>{transaction.amount}</p>
    </section>
  )
}

Transaction.propTypes = {
  transaction: PropTypes.object
}

export default Transaction
