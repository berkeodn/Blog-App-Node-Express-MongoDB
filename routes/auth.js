const express = require('express');
const {register, login, updatePassword} = require('../controllers/auth.js');


const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/updatePassword', updatePassword)


module.exports = router