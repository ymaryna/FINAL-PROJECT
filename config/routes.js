const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const placesController = require('../controllers/places.controller')
const authMiddleware = require('../middlewares/auth.middleware')
//const multer = require('multer')
//const upload = multer({ dest: './public/uploads/' })
//const uploadCloud = require('../config/cloudinary.config.js');
//const passport = require('passport')


module.exports = router;

router.get('/', authMiddleware.isAuthenticated, tweetsController.index)