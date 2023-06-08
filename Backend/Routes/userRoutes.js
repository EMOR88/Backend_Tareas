const express =require('express')
const router = express.Router()
const {crearUsuario, loginUser, misDatos} = require('../Controllers/usersControllers')
const {protect} = require('../Middleware/authMiddleware')

router.post('/', crearUsuario)
router.post('/login', loginUser)
router.get('/me', protect, misDatos)

module.exports = router