const mongoose = require('mongoose')
const Schema = mongoose.Schema

const webserieSchema = new Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    creator: { type: String, required: true },
    genre: { type: String, required: true },
    platform: { type: mongoose.Schema.Types.ObjectId, ref: 'Plataformas' }
  },
  {
    timestamps: true
  }
)

const WebSerie = mongoose.model('WebSerie', webserieSchema, 'webseries')
module.exports = WebSerie
