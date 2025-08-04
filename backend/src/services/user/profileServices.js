
const User = require('../../models/userModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const getProfile = async (userId) => {
    try {
        const user = await User.findById(userId)
        return user;
    } catch (error) {
        console.error('Profile service error:', error);
        throw error;
    }
};



const editProfile = async (userId, data) => {
    try {

        console.log(userId);

        const update = await User.findByIdAndUpdate(userId.id, data,
            { new: true }
        )
        if (update) {
            return true
        }

    } catch (error) {
        console.log(error);

    }
}


const passwordChange = async (old, newPass, userId) => {
    try {
        console.log('pass change servicce', old, newPass, userId);

        const user = await User.findById(userId)

        const isMatch = await bcrypt.compare(old, user.password)
        if (!isMatch) throw new Error('invalid old password')

        const hashed = await bcrypt.hash(newPass, 10)
        user.password = hashed
        await user.save()
        return true

    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = { getProfile, editProfile, passwordChange }