const WebSerie = require('../../api/models/webseries_models')
const series = require('../../data/series')
const mongoose = require('mongoose')
const webseries = require("../../api/models/webseries_models")


mongoose
  .connect(
    'mongodb+srv://nuriamorcillo30:-mDFAeUmFxp9MaE@proyecto6.4vbue.mongodb.net/?retryWrites=true&w=majority&appName=Proyecto6'
  )
  .then(async () => {
    
    for (const serie of series) {
      const serieExistente = await WebSerie.findOne({ title: serie.title });
      if (!serieExistente) {
        await WebSerie.create(serie); 
      }
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))

  .finally(() => mongoose.disconnect())
