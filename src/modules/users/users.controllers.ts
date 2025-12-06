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

export const usersControllers ={
    getAllUser,
}