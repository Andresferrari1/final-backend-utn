import { Router } from "express";
import { User } from "../models/models";
import {getAllUser, getUserId,createUser, updateUser, deleteUser} from "../controllers/user_controllers"


const userRouter = Router()


userRouter.get("/", getAllUser)

userRouter.get("/:id", getUserId)

userRouter.post("/", createUser)

userRouter.put("/:id", updateUser)

userRouter.delete("/:id", deleteUser)

export {userRouter}