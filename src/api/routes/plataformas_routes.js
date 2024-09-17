const express = require('express')
const router = express.Router()

const {
  getPlataforma,
  postPlataforma,
  putPlataforma,
  deletePlataforma
} = require('../controllers/plataformas_controllers')

router.get('/', getPlataforma)
router.post('/', postPlataforma)
router.put('/:id', putPlataforma)
router.delete('/:id', deletePlataforma)

module.exports = router
