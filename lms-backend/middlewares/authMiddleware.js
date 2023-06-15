const User = require("../models/userModel");
const jwt =require("jsonwebtoken");
const asynchandler =require("express-async-handler");


const authMiddleware =asynchandler(async (req, res, next) =>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token =req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decoded =jwt.verify(token , process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                req.user =user;
                next()
            }
        }catch(error){
            throw new Error("Not Authorized, Please  lopgin again");
        }
    }else{
        throw new Error("There is no token attached to the header...");
    }
});

const isAdmin =asynchandler(async( req, res, next)=>{
    const { email } =req.user;
    const isAdmin =await User.findOne({ email:email});
    if(isAdmin.roles !== "admin"){
        throw new Error("You are not admin");

    }else{
        next();
    }
});

const isInstructor =asynchandler(async( req, res, next)=>{
    const { email } =req.user;
    const isInstructor =await User.findOne({ email:email});
    if(isInstructor.roles !== "instructor"){
        throw new Error("You are not instructor");

    }else{
        next();
    }
});

module.exports ={ authMiddleware, isAdmin, isInstructor }
