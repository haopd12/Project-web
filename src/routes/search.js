
const express = require('express');
const router = express.Router();
const searchController = require('../app/controllers/SearchController');

router.use('/', searchController.search);
// router.use('/:query', searchController.show);


module.exports = router;

