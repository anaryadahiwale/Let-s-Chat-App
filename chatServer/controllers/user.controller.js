import userModel from "../models/User.js";

const users = async(req, res) => {
    try {
        const loginUser = req.user._id;
        const allUsers = await userModel.find({_id: {$ne: loginUser}}).select('-password')

        return res.status(200).json({msg: 'success', users: allUsers})
    } catch (err) {
        console.log('Error', err.message)
        res.status(500).json({msg: err})
    }
}

export default users;