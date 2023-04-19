const cloudinary = require("../cloud/cloud");
const User = require("../models/userModel");

exports.uploadImage = async (req, res, next) => {
  try {
    const {userid} = req.body

    const user = User.findById(userid)
    
    if (!user) {
      res.json({msg: "user is not exist", status: false})  
    }

    const { file } = req;
    if (!file) return res.status(401).json({ error: "Image file is missing" });

    const { secure_url: url } = await cloudinary.uploader.upload(file.path);

    
 

    res.status(201).json( { url} );
  } catch (error) {
    next(error);
  }
};
