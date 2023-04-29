require("dotenv").config()

const sendToken = (user,statusCode,res) =>{
    try {
        const token = user.getJwtToken();

    // Options for cookies
   const options = {
       expires: new Date(
           Date.now() + 5 * 24 * 60 * 60 * 1000
       ),
       httpOnly: true,
       sameSite: 'none'
   };
 
   res.status(statusCode).cookie("token",token,options).json({
       status: true,
       user,
       token
   });
    } catch (error) {
        console.log(error)
    }

}

module.exports = sendToken; 