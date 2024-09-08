import jwt from 'jsonwebtoken'
import userModel from '../models/User.js';

const verifyUser = async(req, res, next) => {
try{

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ msg: 'Unauthorized: No token provided' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
        return res.status(401).json({msg: 'unauthorized'})
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if(!decoded) {
        return res.status(401).json({msg: 'invalid token'})
    } 

    const user = await userModel.findOne({_id: decoded.id}).select('-password')

    req.user = user; 
    next();
} catch(err) {
    console.log(err);
    res.status(500).json({ msg: 'Server error' });
}
}

export default verifyUser;