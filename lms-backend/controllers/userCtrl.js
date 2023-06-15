const { generateToken } = require("../config/jwtToken");
const { validateMongoDbId } = require("../config/validateMongoDbId");
const User = require("../models/userModel");
const asyncHandler =require("express-async-handler");
/**Create a user */

const registerAUser = asyncHandler(async (req, res) =>{
    //**Get the email from req.body and find wheter a user with this email or not */

    const email =req.body.email;

    //res.status(200).json(email);

    //**Find the user with this email from req.body */
    const findUser =await User.findOne({ email:email});

    //res.status(200).json(findUser);

    /*Not  find user*/
    if(!findUser){
        /*Create a user*/
        const createUser = await User.create(req.body);
        res.status(200).json({
            status:true,
            message:"User craeted succesfully!",
            createUser,
        });
    }else{
        throw new Error("user already exists!")
    }
});
/* Login users*/

const loginUser =asyncHandler(async (req, res)=>{
    const {email, password} = req.body;

    /*Check user Exists or not*/
    const findUser = await User.findOne({ email: email});
    if(findUser && (await findUser.isPasswordMatched(password))){
        res.status(200).json({
            status:true,
            message:"Logged in successfully!",
            token:generateToken(findUser ?._id),
            role:findUser?.roles,
            username:findUser?.firstname + " " + findUser?.lastname,
            user_image: findUser?.user_image,

        });
    }else{
        throw new Error("Invalid USer");
    }
});
/*Get a User */
const getAUser =asyncHandler(async ( req, res) =>{
    const {id} =req.params;
    validateMongoDbId(id);
    try {
        const getProfile =await User.findById(id);
        res.status(200).json({
            status:true,
            message:"A user found",
            getProfile
        }); 

    } catch(error){
        throw new Error(error);
    }
});

/*Get All Users*/
const getAllUsers = asyncHandler(async (req, res ) =>{
    try{
        const allUser =await User.find();
        res.status(200).json({
           status: true,
           message:"All users fetchs successfully",
            allUser,
        })

    }catch(error){
        throw new Error(error);
    }
});

/* Update User profile*/
const updateUser =asyncHandler( async(req, res) =>{
    const { _id } = req.user;
    validateMongoDbId( _id );
    try{
        const user = await User.findByIdAndUpdate( _id, req.body, { new:true } );
        res.status(200).json({
            status:true,
            message:"Profile updated Successfully",
            user
        });

    }catch(error){
        throw new Error(error);
    }
});

/* Delete a user*/
const deleteUser =asyncHandler( async(req, res) =>{
  
    const { id } =req.params;
    validateMongoDbId(id);
    try {
        const deleteUser =await User.findByIdAndDelete(id);
        res.status(200).json({
            status:true,
            message:"User Deleted Successfully!",
            
        });

    } catch (error) {   
        throw  new Error(error);
    }
});
/*Block a user*/

const blockUser =asyncHandler( async ( req , res)=>{
    const { id } =req.params;
    validateMongoDbId(id);

    try {
        const block =await User.findByIdAndUpdate(id,
            {isblocked:true},
            {new:true}
            );
            res.status(200).json({
                status:true,
                message:"user block Successfully!",

            });
        
    } catch (error) {
        throw new Error(error);
    }
});

/*Unblock A user*/
const unBlockeUser =asyncHandler(async (req, res)=>{
    const {id} =req.params;
    validateMongoDbId(id);
     try {
        const unBlock =await User.findByIdAndUpdate(id,
           {isblocked:false},
           {new:true} 
            );
        res.status(200).json({
            status:true,
            message:"User unblock Successfully"
        });
     } catch (error) {
        throw new Error(error);
     }
});

module.exports ={ 
    registerAUser ,
    loginUser , 
    getAUser,
    getAllUsers, 
    updateUser ,
    deleteUser ,
    blockUser,
    unBlockeUser
};