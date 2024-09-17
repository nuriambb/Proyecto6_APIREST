const WebSerie = require('../models/webseries_models')
const Plataformas = require('../models/plataformas_models')

const getWebserie = async (req, res, next) => {
  try {
    const webseries = await WebSerie.find()


    const platformIds = [
      ...new Set(webseries.map((ws) => ws.platform.toString()))
    ]

    const platforms = await Plataformas.find({
      _id: { $in: platformIds }
    }).select('name _id')
    const platformMap = platforms.reduce((acc, platform) => {
      acc[platform._id.toString()] = platform.name
      return acc
    }, {})

    const webseriesConNombres = webseries.map((ws) => ({
      ...ws._doc,
      platform: platformMap[ws.platform.toString()] || 'Desconocida' 
    }))

    return res.status(200).json(webseriesConNombres)
  } catch (error) {
    return res.status(400).json('Hay un error leyendo la serie')
  }
}
const postWebserie = async (req, res, next) => {
  try {
    const platformExists = await Plataformas.findById(req.body.platform)
    if (!platformExists) {
      return res.status(404).json('Plataforma no encontrada')
    }
    const newWebserie = new WebSerie(req.body)
    const webserieSaved = await newWebserie.save()

    platformExists.series.push(webserieSaved._id)
    await platformExists.save()

    return res.status(201).json(webserieSaved)
  } catch (error) {
    return res.status(400).json('Hay un error creando la serie 😖')
  }
}
const putWebserie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { platform } = req.body;


    let platformData = null;
    if (platform) {
      platformData = await Plataformas.findById(platform).select('name');
      if (!platformData) {
        return res.status(404).json('Plataforma no encontrada');
      }
    }

    const webserieUpdate = await WebSerie.findByIdAndUpdate(id, req.body, {
      new: true
    });

    if (!webserieUpdate) {
      return res.status(404).json('Serie no encontrada');
    }


    const response = {
      ...webserieUpdate._doc,
      platform: platformData ? platformData.name : webserieUpdate.platform
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(`Error actualizando la serie: ${error.message}`)
  }
}
const deleteWebserie = async (req, res, next) => {
  try {
    const { id } = req.params
    const webserie = await WebSerie.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Serie eliminada',
      elemento: webserie 
    });
  } catch (error) {
    return res
      .status(400)
      .json(`Hay un error borrando la serie: ${error.message}`)
  }
}

module.exports = {
  getWebserie,
  postWebserie,
  putWebserie,
  deleteWebserie
}
