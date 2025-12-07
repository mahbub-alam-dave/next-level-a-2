import { pool } from "../../config/db";
import dayjs from "dayjs";

const bookVehicle = async (bookingData: Record<string, unknown>) => {
    const {customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status, vehicle_name, daily_rent_price} = bookingData;

    const result = await pool.query(`INSERT INTO Bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status])
    
    return result;

}

export const bookingsService = {
    bookVehicle,
}