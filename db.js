import mongoose from 'mongoose'

const MONGODB_URI =
  'mongodb+srv://gladion:mister13pasos@cluster0.1s9m6.mongodb.net/GraphDB'

mongoose
  .connect(MONGODB_URI, {})

  .then(() => {
    console.log('Conected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connection to MongoDB', error.message)
  })
