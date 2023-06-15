const mongoose =require("mongoose");
const validateMongoDbId = (id) =>{
    const isvalid  =mongoose.Types.ObjectId.isValid(id);
    if(!isvalid) throw new Error("this Id is not valid or not found");
};

module.exports = { validateMongoDbId };