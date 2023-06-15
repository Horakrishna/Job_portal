const mongoose = require('mongoose'); 
const bcrypt   = require("bcrypt");

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
    const salt    = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});
/*Login A USer  (password bcrypt code)*/
userSchema.methods.isPasswordMatched =async function(enteredPassword){
     return await bcrypt.compare(enteredPassword, this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);