const asyncHandler = require('express-async-handler')
const Tarea = require('../Modelos/tareaModel')

const getTareas = asyncHandler(async (req,res) => {
    const tareas = await Tarea.find({user: req.user.id})

    res.status(200).json(tareas)
})

const setTarea = asyncHandler(async (req,res) => {

    if(!req.body.texto) {
        //res.status(400).json({message: 'Las tareas sin texto no son validas, por favor teclea un texto'})
        res.status(400)
        throw new Error('Las tareas sin texto no son validas, por favor teclea un texto')
    }

    const tarea = await Tarea.create({
        texto: req.body.texto,
        user: req.user.id
    })


    res.status(201).json({tarea})
})

const updateTarea = asyncHandler(async (req,res) => {

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea){
        res.status(400)
        throw new Error('Tarea no encontrada')
    }

    if (tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Acceso no autorizado')
    }

    const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(tareaUpdated)
})

const deleteTarea = asyncHandler(async (req,res) => {

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea){
        res.status(400)
        throw new Error('Tarea no encontrada')
    }

    if (tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Acceso no autorizado')
    }

    await tarea.deleteOne()

    //await Tarea.findByIdAndDelete(req.params.id)

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTareas,
    setTarea,
    updateTarea,
    deleteTarea
}