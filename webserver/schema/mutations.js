const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')
const UserType = require('./user-type')
const { UserModel } = require('../data-models/User')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat },
        category: { type: GraphQLString },
        spendDate: { type: GraphQLString },
        transaction_id: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount, category, spendDate, transaction_id }) {
        return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount, category, spendDate, transaction_id })).save()
      }
    },
    deleteTransaction: {
      type: TransactionType,
      args: {
        transaction_id: { type: GraphQLString }
      },
      resolve (parentValue, { transaction_id }) {
        return TransactionModel.deleteOne({ transaction_id })
      }
    },
    updateTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat },
        category: { type: GraphQLString },
        spendDate: { type: GraphQLString },
        transaction_id: { type: GraphQLString }
      },
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount, category, spendDate, transaction_id }) {
        return TransactionModel.findOneAndUpdate(
          { transaction_id },
          { user_id, description, merchant_id, debit, credit, amount, category, spendDate },
          { new: true }
        )
      }
    },
    registerUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve (parentValue, { firstName, lastName, email, password}) {
        // register functionality here
      }
    }
  }
})

module.exports = mutation
