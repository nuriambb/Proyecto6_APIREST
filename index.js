require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/database')
const webseriesRoutes = require('./src/api/routes/webseries_routes')
const plataformasRoutes = require('./src/api/routes/plataformas_routes')

const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/webseries', webseriesRoutes)
app.use('/api/v1/plataformas', plataformasRoutes)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('Conectado en http://localhost:3000')
})
