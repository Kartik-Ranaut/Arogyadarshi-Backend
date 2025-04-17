const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth= async(req,res,next)=>{

    try{
        //extract JWT token
        //PENDING : other ways to fetch token
        const token =  req.body.token;

        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }

        //verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            //why this ? (for data required in next middleware)
            req.user = payload;
            req.body.uId=payload._id;
            
        } catch(error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    } 
    catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
        });
    }
}