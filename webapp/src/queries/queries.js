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
      transactionId: transaction_id
      user_id
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
    $user_id: String!
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
      user_id: $user_id
    ) {
      amount,
      description,
      category,
      debit,
      credit,
      merchantID: merchant_id,
      spendDate,
      transactionId: transaction_id,
      user_id
    } 
  }
`

export const DELETE_TRANSACTION = gql`
  mutation(
    $transaction_id: String!
  ) {
    deleteTransaction(
      transaction_id: $transaction_id
    ) {
      transactionId: transaction_id
    }
  }
`

export const UPDATE_TRANSACTION = gql`
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
    updateTransaction(
      amount: $amount,
      description: $description,
      category: $category,
      debit: $debit,
      credit: $credit,
      merchant_id: $merchant_id,
      spendDate: $spendDate,
      transaction_id: $transaction_id
    ) {
      amount,
      description,
      category,
      debit,
      credit,
      merchantID: merchant_id,
      spendDate,
      transactionId: transaction_id
    }
  }
`

export const REGISTER_USER = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $user_id: String!
    $romanNumeralSetting: Boolean!
    $darkMode: Boolean!
  ) {
    registerUser(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      password: $password,
      user_id: $user_id,
      romanNumeralSetting: $romanNumeralSetting,
      darkMode: $darkMode
    ) {
      id,
      firstName,
      lastName,
      email,
      user_id,
      romanNumeralSetting,
      darkMode
    }
  }
`

export const LOGIN_USER = gql`
  query User(
    $email: String!
    $password: String!
  ) {
    user(
      email: $email
      password: $password
    ) {
      id,
      firstName,
      lastName,
      email,
      user_id,
      romanNumeralSetting,
      darkMode
    }
  }
`
