// var express = require('express');
// var router = express.Router();
const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const ErrorHandler = require('../middleware/error.middleware');
const AuthGuard = require('../middleware/auth.middleware');
const schema = require('../validations/auth.validation');
const validate = require('../utils/validator.util');

router.post('/register', validate(schema.register), ErrorHandler(AuthController.register));
router.post('/login', validate(schema.login), ErrorHandler(AuthController.login));
router.get('/user', AuthGuard, ErrorHandler(AuthController.getUser));
router.get('/logout', AuthGuard, ErrorHandler(AuthController.logout));

router.all('*', (req, res) => res.status(400).json({msg: 'BadRequest'}));

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
