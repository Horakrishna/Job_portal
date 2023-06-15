const express = require("express");
const {registerAUser, loginUser, getAllUsers, updateUser,getAUser, deleteUser, blockUser, unBlockeUser} =require("../controllers/userCtrl");
const { authMiddleware ,isAdmin} = require("../middlewares/authMiddleware");
const userRouter = express.Router();

/*All Post Route*/
userRouter.post("/register",registerAUser);
userRouter.post("/login",loginUser);

/*All get Route*/
userRouter.get("/all-users", isAdmin, getAllUsers);
userRouter.get("/:id", authMiddleware, getAUser);

/*All Put Route */

userRouter.put("/update-profile", authMiddleware, updateUser);
userRouter.put("/block/:id", authMiddleware, isAdmin, blockUser);
userRouter.put("/unblock/:id", authMiddleware, isAdmin, unBlockeUser);
/**All Delete Routes */

userRouter.delete("/:id", authMiddleware, isAdmin, deleteUser);

module.exports =userRouter;