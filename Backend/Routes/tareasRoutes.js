const express =require('express')
const router = express.Router()
const {getTareas, setTarea, updateTarea, deleteTarea} = require('../Controllers/tareasControllers')
const {protect} = require('../Middleware/authMiddleware')

router.route('/').get(protect, getTareas).post(protect, setTarea) //las dos linas de abajo se pueden resumir en una sola linea de esta manera
//router.get('/', getTareas)
//router.post('/', setTarea)

router.route('/:id').put(protect, updateTarea).delete(protect, deleteTarea) //las dos linas de abajo se pueden resumir en una sola linea de esta manera
//router.put('/:id', updateTarea)
//router.delete('/:id', deleteTarea)

module.exports = router