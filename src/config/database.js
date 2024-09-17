const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('conectado con exito a la BBDD')
  } catch (error) {
    console.error('no se puede conectar a la BBDD', error)
  }
}

module.exports = { connectDB }
