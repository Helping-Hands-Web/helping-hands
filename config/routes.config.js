const express = require('express');
const router = express.Router();
const common = require('../controllers/common.controller');
const auth = require('../controllers/auth.controller');
const users = require('../controllers/users.controller');
const services = require('../controllers/services.controller');
const secure = require('../middlewares/secure.mid');
const upload = require('./multer.config');
const works = require('../controllers/works.controller');


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
router.post('/users/me/edit', secure.isAuthenticated, upload.single('avatar'), users.doEdit);
router.get('/dashboard', secure.isAuthenticated, users.dashboard);
router.get('/users/:id/activate', auth.activate);

router.get('/services/new', secure.isAuthenticated, services.create);
router.post('/services/new', secure.isAuthenticated, services.doCreate);
router.get('/services', secure.isAuthenticated, services.list);

router.get('/services/:id/work', secure.isAuthenticated, works.create);
router.post('/services/:id/work', secure.isAuthenticated, works.doCreate);

router.post('/work/:id/confirm', secure.isAuthenticated, secure.workOwner, works.doConfirm);
router.post('/work/:id/cancel', secure.isAuthenticated, secure.workOwner, works.doCancel);
router.post('/work/:id/done', secure.isAuthenticated, secure.workOwner, works.doDone);

module.exports = router