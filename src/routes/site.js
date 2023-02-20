
const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.use('/:slug', siteController.show);
router.use('/', siteController.index);

// let array = siteController.getData();
// console.log(array);

module.exports = router;

