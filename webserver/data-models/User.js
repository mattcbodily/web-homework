const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
  user_id: { type: String, default: null },
  romanNumeralSetting: { type: Boolean, default: null },
  darkMode: { type: Boolean, default: null }
})

const model = mongoose.model('user', UserSchema)

module.exports = {
  UserModel: model,
  UserSchema,
  default: UserSchema
}
