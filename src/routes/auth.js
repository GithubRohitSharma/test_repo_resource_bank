const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const authCtrl = require('../controllers/auth.controller');

router.get('/login', authCtrl.getLogin);

router.get('/changePassword', authCtrl.getChangePassword);

router.get('/signup', authCtrl.getSignup);

router.post('/login', authCtrl.postLogin);

router.post('/changePassword', authCtrl.postChangePassword);

router.post('/signup', authCtrl.postSignup);

router.post('/home', authCtrl.postHome);

module.exports = router;


