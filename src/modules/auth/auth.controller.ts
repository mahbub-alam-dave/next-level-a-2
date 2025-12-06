import { Request, Response } from "express";
import { authServices } from "./auth.services";

const signupUser = async (req: Request, res: Response) => {
    const {name, email } = req.body;

    try {
        const result = await authServices.signupUser(name, email)
        res.status(201).json({
            success: true,
            message: "User signup successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}