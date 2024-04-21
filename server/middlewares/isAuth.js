require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');

const isAuthenticated = async(req, res, next) =>{
    //! Get the token from the header
    const headerObj = req.headers
    const token = headerObj?.authorization?.split(" ")[1]
    //!verify token
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
        if(err){
            return false
        }else{
            return decoded
        }
    })
    //!find user
    
    //!Save the user into the req object
    if(verifyToken){
        req.user = verifyToken.id
        next()

    }else{
        const err = new Error('Token expired please login again');
        next(err)

    }
}

module.exports = isAuthenticated;