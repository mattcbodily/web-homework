const graphql = require('graphql')
const TransactionType = require('./transaction-type')
const UserType = require('./user-type')
const Transactions = require('../query-resolvers/transaction-resolvers.js')

const {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} = graphql
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    transaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Transactions.findOne(args.id)
      }
    },
    transactions: {
      type: GraphQLList(TransactionType),
      args: {
        amount: { type: GraphQLFloat },
        credit: { type: GraphQLBoolean },
        debit: { type: GraphQLBoolean },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        category: { type: GraphQLString },
        spendDate: { type: GraphQLString },
        transaction_id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Transactions.find(args)
      }
    },
    user: {
      type: GraphQLList(UserType),
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        // login functionality here
      }
    }
  })
})

module.exports = RootQuery
