const sendToken = (user,statusCode,res) =>{
    try {
        const token = user.getJwtToken();

    // Options for cookies
   const options = {
       expires: new Date(
           Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
       ),
       httpOnly: true
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