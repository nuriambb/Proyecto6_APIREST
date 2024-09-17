const mongoose = require('mongoose')
const Schema = mongoose.Schema
const WebSerie = require('../models/webseries_models')

const PlataformaSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: mongoose.Schema.Types.Mixed, required: true },
    url: { type: String, required: true },
    series: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WebSerie' }]
  },
  {
    timestamps: true
  }
)

const Plataforma = mongoose.model(
  'Plataformas',
  PlataformaSchema,
  'Plataformas'
)
module.exports = Plataforma
