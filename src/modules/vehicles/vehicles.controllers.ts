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

const getAllVehicles = async(req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.getAllVehicles()
        if(result.rows.length === 0) {
            res.status(400).json({
                success: false,
                message: "No vehicles available"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicles fetched successfully",
                data: result.rows
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getSingleVehicleDetails = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.getVehicleDetails(req.params.vehicleId!)
        if(result.rows.length === 0){
            res.status(404).json({
                success: false,
                message: "Vehicle is not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Successfully fetched vehicles details",
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

const updateVehicleDetails = async (req: Request, res: Response) => {
    // const id = req.params.id
    try {
        const result = await vehiclesServices.updateVehicleDetails(req.body, req.params.vehicleId as string)
        if(result.rows.length === 0){
            res.status(404).json({
                success: false,
                message: "Vehicle is not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Successfully updated vehicles details",
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

const deleteVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.deleteVehicle(req.params.vehicleId as string)
        if(!result || result.rowCount === 0){
            res.status(404).json({
                success: false,
                message: "Vehicle not found"
            })
        } else {
            res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully",
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

export const vehiclesController = {
    addVehicles,
    getAllVehicles,
    getSingleVehicleDetails,
    updateVehicleDetails,
    deleteVehicle,
}