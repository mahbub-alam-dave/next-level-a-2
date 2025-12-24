import { Request, Response } from "express";
import { userServices } from "./users.services";

const getAllUser = async (req: Request, res: Response) =>{
    try {
        const result = await userServices.getUser()

        res.status(200).json({
            success: true,
            message: "Successfully fetched all users",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateUserData = async (req: Request, res: Response) => {
    let idToUpdate: string;
    const user = (req as any).user;
/*     if(user.role === "admin") {
        idToUpdate = req.params.userId as string;
    } else if(user.id === req.params.userId) {
        idToUpdate = user.id;
    } else {
        throw new Error("You are not permissible to update the user")
    } */
   idToUpdate = req.params.userId as string
    try {
        const result = await userServices.updateUserData(req.body, idToUpdate)

        if(result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "user not found"
            })
        } else {
            res.status(201).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0]
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteUser = async(req: Request, res: Response) => {
    try {
        const result = await userServices.deleteUser(req.params.userId as string)
        if(result.rowCount === 0){
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: null
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const usersControllers ={
    getAllUser,
    updateUserData,
    deleteUser,
}