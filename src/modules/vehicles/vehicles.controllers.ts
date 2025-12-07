import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.services";

const addVehicles = async(req:Request, res:Response) => {

    try {
        const result = await vehiclesServices.addVehicles(req.body)
        res.status(201).json({
            success: true,
            message: "Vehicles added successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
       res.status(500).json({
        success: false,
        message: error.message
       }) 
    }
}

export const vehiclesController = {
    addVehicles,
}