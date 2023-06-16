const mongoose = require('mongoose'); 
const bcrypt   = require("bcrypt");
const crypto   =require("crypto");
let userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
       
    },
    lastname:{
        type:String,
        required:true,
       
    },
    user_image:{
        type:String,
        default:"https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    mobile:{
        type:String,
        required:true, 
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true,
    },
    roles:{
        type:String,
        default:"user",
    },
    profession:{
        type:String,
        required:true,
    },
    isblocked:{
        type:Boolean,
        default:false,
    },
    passwordChangedAt: Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
    stripe_account_id:String,
    stripe_seler:{},
    stripeSession:{}
},
    {
        timestamps:true,
    }
);
/* Save Data*/
userSchema.pre("save",async function (next){
    /*Update password after code*/
    if(!this.isModified("password")){
        next();
    }
    const salt    = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});
/*Login A USer  (password bcrypt code)*/
userSchema.methods.isPasswordMatched =async function(enteredPassword){
     return await bcrypt.compare(enteredPassword, this.password);
}
/*Password Reset*/
userSchema.methods.createPasswordResetToken =async function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10 minutes
    return resetToken;

}
//Export the model
module.exports = mongoose.model('User', userSchema);