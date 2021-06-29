const express = require('express');
const router = express.Router();
const common = require('../controllers/common.controller');
const auth = require('../controllers/auth.controller');
const users = require('../controllers/users.controller');
const secure = require('../middlewares/secure.mid');
const upload = require('./multer.config');


router.get('/', common.home);

router.get('/register', secure.isNotAuthenticated, auth.register);

router.get('/register/email', secure.isNotAuthenticated, auth.registerEmail);
router.post('/register/email', secure.isNotAuthenticated, auth.doRegisterEmail);

router.get('/authenticate/google', auth.loginWithGoogle);
router.get('/authenticate/google/cb', auth.doLoginWithGoogle);

router.get('/login', secure.isNotAuthenticated, auth.login);
router.post('/login', secure.isNotAuthenticated, auth.doLogin);

router.get('/logout', secure.isAuthenticated, auth.logout);

router.get('/users/:id', secure.isAuthenticated, users.detail);
router.get('/users/me/edit', secure.isAuthenticated, users.edit); //profile/edit
router.post('/users/me/edit', secure.isAuthenticated, upload.single('avatar'), users.doEdit)

module.exports = router