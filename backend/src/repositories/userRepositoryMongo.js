const UserModel = require('../models/userModel');

const userRepositoryMongo = {
  findByEmail: async (email) => {
    return await UserModel.findOne({ email });
  },

  create: async (user) => {
    const newUser = new UserModel(user);
    return await newUser.save();    
  }
};



module.exports = {
    userRepositoryMongo,
 
};
