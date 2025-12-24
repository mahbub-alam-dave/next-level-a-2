import dayjs from "dayjs";
import { Request, Response } from "express";
import { pool } from "../../config/db";
import { bookingsService } from "./bookings.services";

const bookVehicles = async(req: Request, res: Response) => {
    
    const {vehicle_id, rent_start_date, rent_end_date} = req.body;
    const customer_id = (req as any).user.id;

    const vehicleRes = await pool.query(`SELECT * FROM Vehicles WHERE id=$1`,[vehicle_id])

    if(vehicleRes.rows.length === 0 || vehicleRes.rows[0].availability_status === "booked"){
        return res.status(400).json({
            success: false,
            message: "Vehicle not found or vehicle is booked"
        })
    }
    
    const date_format = "YYYY-MM-DD"
    const startDate = dayjs(rent_start_date as string, date_format, true);
    const endDate = dayjs(rent_end_date as string, date_format, true)
    
    if(!startDate.isValid() || !endDate.isValid() || startDate.isAfter(endDate)) {
        return res.status(400).json({
            success: false,
            message: "Invalid date format or start date is after end date."
        })
    }

    const totalRentDays = endDate.diff(startDate, "day") + 1;
    const totalPrice = vehicleRes.rows[0].daily_rent_price * totalRentDays;

    const bookingsObj = {
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        total_price: totalPrice,
        status: "active",
        vehicle_name: vehicleRes.rows[0].vehicles_name,
        daily_rent_price: vehicleRes.rows[0].daily_rent_price

    }

    try {
      const bookings = await bookingsService.bookVehicle(bookingsObj)
      if(bookings.result.rows[0] && bookings.vehicle.rows[0] ) {
      return res.status(201).json({
        success: true,
        message: "Vehicle booked successfully",
        data: bookings.result.rows[0]
    })
    }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

const getBookings = async(req:Request, res: Response) => {
    const user = (req as any).user;
    try {
        const result = await bookingsService.getBookings(user.role, user.id)

        if(result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No booking found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Bookings fetched successfully",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateBookings = async (req: Request, res: Response) => {
    const bookingId = req.params.bookingId;
    const role = (req as any).user.role;
    const customerId = (req as any).user.id;
    const {status} = req.body;

    try {
        const {data, message} = await bookingsService.updateBookings(bookingId as string, customerId, status, role)
        
        return res.status(201).json({
                success: true,
                message: message,
                data: data
            })

    } catch (error: any) {
            return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}



export const bookingsController = {
    bookVehicles,
    getBookings,
    updateBookings
}