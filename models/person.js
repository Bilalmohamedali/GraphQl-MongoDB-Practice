import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const schema = new mongoose.schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 5
  },
  phone: {
    type: String,
    minLength: 5
  },
  street: {
    type: String,
    required: true,
    minLength: 5
  },
  city: {
    type: String,
    required: true,
    minLength: 3
  }
})

schema.plugin(uniqueValidator)

export default mongoose.model('Person', schema)
