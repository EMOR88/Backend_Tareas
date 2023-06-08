const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asynchandler = require('express-async-handler')
const User = require('../Modelos/userModel')

const crearUsuario = asynchandler (async(req, res) => {

    const {name,email,password}=req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error ('Faltan datos')
    }

    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error ('Usuario existente')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    }else {
        res.status(400)
        throw new Error('Datos no validos')
    }
   
})

const loginUser = asynchandler (async(req, res) => {

    const {email,password}=req.body

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error ('Credenciales no validas')
    }

    
})


const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

const misDatos = asynchandler (async(req, res) => {
    res.status(200).json(req.user)
})

module.exports = {
    crearUsuario,
    loginUser,
    misDatos
}