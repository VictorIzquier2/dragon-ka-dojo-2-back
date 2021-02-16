const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true, unique: true},
  password: {type: String, required: true, trim: true},
  karatekas: [{type: Schema.ObjectId, ref: 'Karateka'}],
  sensei: {type: Schema.ObjectId, ref: 'Sensei'},
  created: {type: Date, default: Date.now()},
  expire: {type: Number}
})

const User = mongoose.model('User', userSchema)

module.exports = User;