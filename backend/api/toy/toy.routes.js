const express = require('express')
const {log} = require('../../middlewares/logger.middleware.js')
const {getToys, getToyById, addToy, updateToy, removeToy, addToyMsg, removeToyMsg } = require('./toy.controller.js')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/',log, getToys)
router.get('/:id', getToyById)
router.post('/', addToy)
router.put('/:id',updateToy)
router.delete('/:id',removeToy)

module.exports = router