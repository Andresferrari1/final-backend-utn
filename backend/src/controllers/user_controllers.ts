import { User } from "../models/models"
import {Request, Response} from "express"


const getAllUser = async (req:Request, res:Response): Promise<any> => {
  try {
    const users = await User.find()
    res.json({ success: true, data: users, message: "Usuarios obtenidos" })
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message })
  }
}

const getUserId = async (req:Request, res:Response): Promise<any>=> {
try {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ success: false, message: "Usuario no encontrado" })
    }
    res.json({ success: true, data: user, message: "Usuario obtenido" })
    } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message })
}
}

const createUser = async (req:Request, res:Response): Promise<any> => {
  try {
    const newUser = new User(req.body)
    const savedUser = await newUser.save()
    res.status(201).json({ success: true, data: savedUser, message: "Usuario creado" })
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message })
  }
}

const updateUser =  async (req:Request, res:Response): Promise<any> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" })
    }
    res.json({ success: true, data: updatedUser, message: "Usuario actualizado" })
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message })
  }
}

const deleteUser = async (req:Request, res:Response): Promise<any> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" })
    }
    res.json({ success: true, data: deletedUser, message: "Usuario eliminado" })
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message })
  }
}

export{getAllUser, getUserId, createUser, updateUser, deleteUser}