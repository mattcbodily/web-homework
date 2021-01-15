import gql from 'graphql-tag'

export const ADD_TRANSACTION = gql`
    mutation(
      $amount: Float!
      $description: String!
      $category: String!
      $debit: Boolean!
      $credit: Boolean!
      $merchant_id: String!
      $spendDate: String!
    ) {
      addTransaction(
        amount: $amount
        description: $description
        category: $category
        debit: $debit
        credit: $credit
        merchant_id: $merchant_id
        spendDate: $spendDate
      ) {
        amount,
        description,
        category,
        debit,
        credit,
        merchant_id,
        spendDate
      } 
    }
`
