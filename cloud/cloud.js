const cloudinary = require("cloudinary").v2;

require("dotenv").config()

const cloudname = process.env.CLOUD_NAME
const apisecret = process.env.CLOUD_SECRET
const apikey = process.env.CLOUD_API_KEY

cloudinary.config({
  cloud_name: "dw51bz9id",
  api_key: 346597522261813,
  api_secret: "xXhyExlc8pm_wxbU8s2dlOx7KBo",
  secure: true,
}); 
 

module.exports = cloudinary; 