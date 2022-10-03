const express = require('express')
const router = express.Router()
const dataController = require('../controllers/dataController')


// router.get('/api/getData/:item', dataController.getData);
router.get('/api/getData', dataController.getData);


module.exports = router;