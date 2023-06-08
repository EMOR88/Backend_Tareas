const jwt = require ('jsonwebtoken')
const asyncHandler = require ('express-async-handler')
const User = require ('../Modelos/userModel')

const protect = asyncHandler (async (req, res, next) => {
    
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Obtener el token del encabezado de autorizaciòn
            token = req.headers.authorization.split(' ') [1]

            //Verificación de token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtenemos el user del token
            req.user = await User.findById(decoded.id).select('-password')

            //continuamos con la ejecucion del programa
            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error ('Acceso no permitido')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Acceso no autorizado, ningun token proporcionado')
    }

})

module.exports = {protect}