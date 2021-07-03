const express = require('express');
const router = express.Router();
const common = require('../controllers/common.controller');
const auth = require('../controllers/auth.controller');
const users = require('../controllers/users.controller');
const services = require('../controllers/services.controller');
const secure = require('../middlewares/secure.mid');
const upload = require('./multer.config');


router.get('/', secure.isNotAuthenticated, common.home);
router.get('/how-does-it-work', secure.isAuthenticated, common.howWork);


router.get('/register', secure.isNotAuthenticated, auth.register);

router.get('/register/email', secure.isNotAuthenticated, auth.registerEmail);
router.post('/register/email', secure.isNotAuthenticated, auth.doRegisterEmail);

router.get('/authenticate/google', auth.loginWithGoogle);
router.get('/authenticate/google/cb', auth.doLoginWithGoogle);

router.get('/login', secure.isNotAuthenticated, auth.login);
router.post('/login', secure.isNotAuthenticated, auth.doLogin);

router.get('/logout', secure.isAuthenticated, auth.logout);

router.get('/users/:id', secure.isAuthenticated, users.detail);
router.get('/users/me/edit', secure.isAuthenticated, users.edit); 
router.post('/users/me/edit', secure.isAuthenticated, upload.single('avatar'), users.doEdit)
router.get('/dashboard', secure.isAuthenticated, users.dashboard);

router.get('/services/new', secure.isAuthenticated, services.create);
router.post('/services/new', secure.isAuthenticated, services.doCreate);
router.get('/services', secure.isAuthenticated, services.list);


module.exports = router