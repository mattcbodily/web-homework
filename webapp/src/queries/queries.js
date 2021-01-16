import gql from 'graphql-tag'

export const GET_ALL_TRANSACTIONS = gql`
  {
    transactions {
      amount,
      description,
      category,
      debit,
      credit,
      merchantID: merchant_id,
      spendDate,
      transactionID: transaction_id
    }
  }
`

export const ADD_TRANSACTION = gql`
    mutation(
      $amount: Float!
      $description: String!
      $category: String!
      $debit: Boolean!
      $credit: Boolean!
      $merchant_id: String!
      $spendDate: String!
      $transaction_id: String!
    ) {
      addTransaction(
        amount: $amount
        description: $description
        category: $category
        debit: $debit
        credit: $credit
        merchant_id: $merchant_id
        spendDate: $spendDate
        transaction_id: $transaction_id
      ) {
        amount,
        description,
        category,
        debit,
        credit,
        merchant_id,
        spendDate,
        transaction_id
      } 
    }
`
