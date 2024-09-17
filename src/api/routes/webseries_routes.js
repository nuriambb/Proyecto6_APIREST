const express = require('express')
const router = express.Router()
const {
  getWebserie,
  postWebserie,
  putWebserie,
  deleteWebserie
} = require('../controllers/webseries_controllers')

router.get('/', getWebserie)
router.post('/', postWebserie)
router.put('/:id', putWebserie)
router.delete('/:id', deleteWebserie)

module.exports = router
