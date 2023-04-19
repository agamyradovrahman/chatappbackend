const cloudinary = require("cloudinary").v2;

require("dotenv").config()

const cloudname = process.env.CLOUD_NAME
const apisecret = process.env.CLOUD_SECRET
const apikey = process.env.CLOUD_API_KEY

cloudinary.config({
  cloud_name: cloudname,
  api_key: apikey,
  api_secret: apisecret,
  secure: true,
});


module.exports = cloudinary; 