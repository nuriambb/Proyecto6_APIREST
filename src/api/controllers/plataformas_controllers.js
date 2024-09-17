const Plataforma = require('../models/plataformas_models')
const WebSerie = require('../models/webseries_models')

const getPlataforma = async (req, res, next) => {
  const plataformas = await Plataforma.find().populate('series')

  const plataformasConSeries = await Promise.all(
    plataformas.map(async (plataforma) => {
      const series = await WebSerie.find({ platform: plataforma._id })
      return {
        ...plataforma.toObject(),
        series
      }
    })
  )

  return res.status(200).json(plataformasConSeries)
}
const postPlataforma = async (req, res, next) => {
  try {
    const newPlataforma = new Plataforma(req.body)
    const PlataformaSaved = await newPlataforma.save()
    return res.status(201).json(PlataformaSaved)
  } catch (error) {
    return res.status(400).json('Hay un error creando la plataforma 😖')
  }
}
const putPlataforma = async (req, res, next) => {
  try {
    const { id } = req.params 
    const { newSeries } = req.body 

    
    const updatedPlataforma = await Plataforma.findByIdAndUpdate(
      id,
      { $addToSet: { series: { $each: newSeries } } }, 
      { new: true } 
    )

    if (!updatedPlataforma) {
      return res.status(404).json('Plataforma no encontrada')
    }

    return res.status(200).json(updatedPlataforma)
  } catch (error) {
    return res.status(400).json('Hay un error actualizando la plataforma')
  }
}
const deletePlataforma = async (req, res, next) => {
  try {
    const { id } = req.params
    const PlataformaDeleted = await Plataforma.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'Elemento eliminado',
      elemento: PlataformaDeleted
    })
  } catch (error) {
    return res.status(400).json('Hay un error borrando la plataforma')
  }
}

module.exports = {
  getPlataforma,
  postPlataforma,
  putPlataforma,
  deletePlataforma
}
