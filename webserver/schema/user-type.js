/* eslint-disable no-unused-vars */
const path = require('path')
const graphql = require('graphql')
const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean
} = graphql

const UserSchema = require(path.join('..', 'data-models', 'User')) // eslint-disable-line no-unused-vars

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    user_id: { type: GraphQLString },
    romanNumeralSetting: { type: GraphQLBoolean },
    darkMode: { type: GraphQLBoolean }
  })
})

module.exports = UserType
