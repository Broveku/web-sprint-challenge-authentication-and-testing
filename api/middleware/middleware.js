const User = require('../models/model')

const checkUsernameToken = async (req, res, next)=>{
    try{
        const user = await User.findBy(req.body.username)
        if (user){
            next({status: 401, message: 'username already taken'})
        } else{
            next()
        }
    }catch (err){
        next(err)
    }
}

const checkUsernameExists = async (req, res, next)=>{
    try{
        const user = await User.findBy(req.body.username)
        if (!user){
            next({staus: 401, message: 'username does not exist'})
        }else{
            req.user = user
            next()
        }
    }catch(err) {
        next(err)  
    }
}

const validateFields = (req, res, next) =>{
    if (!req.body.username || !req.body.password) {
        next({status: 401, message: 'username and password are required'})
    } else {
        req.body.username = req.body.username.trim()
        next()
    }
}

module.exports = { checkUsernameExists, checkUsernameToken, validateFields }