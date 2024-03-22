import express from "express";
import { createUser, deleteUser, findOneUserById, getAllUser, updateUser } from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.route("/create").post(createUser)
userRouter.route("/getAllUsers").get(getAllUser)
userRouter.route("/getById/:id").get(findOneUserById)
userRouter.route("/update/:id").patch(updateUser)
userRouter.route("/delete/:id").post(deleteUser)


export { userRouter }