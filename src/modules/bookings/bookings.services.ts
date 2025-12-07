import { pool } from "../../config/db";
import dayjs from "dayjs";

const bookVehicle = async (bookingData: Record<string, unknown>) => {

    const {customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status, vehicle_name, daily_rent_price} = bookingData;

    const availability_status = "booked"

    const result = await pool.query(`INSERT INTO Bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status])

    const vehicle = await pool.query(`UPDATE Vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,[availability_status, vehicle_id])

    return {result, vehicle};

}

const getBookings = async (role: string, id: string) => {
    let query: string;
    let params: string[] = []

    if (role === "admin") {
        query = `SELECT * FROM Bookings ORDER BY id DESC`;
    } 
    else if (role === "user") {
        query = `SELECT * FROM Bookings WHERE customer_id=$1 ORDER BY id DESC`;
        params = [id];
    } 
    else {
        throw new Error("Invalid role");
    }

    const result = await pool.query(query, params);

    return result;
}

const cancelBookings = async(bookingId: string, customerId: string) => {
        const booking = await pool.query(
            `SELECT * FROM Bookings WHERE id=$1 AND customer_id=$2`,
            [bookingId, customerId]
        );

        if (booking.rows.length === 0) {
            throw new Error("Booking not found for this customer");
        }

        const data = booking.rows[0];
        const today = dayjs().format("YYYY-MM-DD");

        if (dayjs(today).isAfter(dayjs(data.rent_start_date))) {
            throw new Error("Cannot cancel booking after start date");
        }

        // Cancel booking
        const updated = await pool.query(
            `UPDATE Bookings SET status='cancelled' WHERE id=$1 RETURNING *`,
            [bookingId]
        );

        // Make vehicle available again
        await pool.query(
            `UPDATE Vehicles SET availability_status='available' WHERE id=$1`,
            [data.vehicle_id]
        );

    return updated.rows[0]
}

const markAsReturned = async(bookingId: string) => {
    const booking = await pool.query(`SELECT * FROM Bookings WHERE id=$1`,[bookingId])

    if(booking.rows.length === 0) {
        throw new Error("Booking not found")
    }

    const data = booking.rows[0];

        // update booking status
        const updated = await pool.query(
            `UPDATE Bookings SET status='returned' WHERE id=$1 RETURNING *`,
            [bookingId]
        );

        // vehicle available again
        await pool.query(
            `UPDATE Vehicles SET availability_status='available' WHERE id=$1`,
            [data.vehicle_id]
        );

        return updated.rows[0];
}

const autoReturnExpiredBookings = async() => {
    const today = dayjs().format("YYYY-MM-DD");

        // Find all bookings that ended before today and still active
        const expiredBookings = await pool.query(
            `SELECT * FROM Bookings 
             WHERE rent_end_date < $1 
             AND status='active'`,
            [today]
        );

        for (const booking of expiredBookings.rows) {
            await pool.query(
                `UPDATE Bookings SET status='returned' WHERE id=$1`,
                [booking.id]
            );

            await pool.query(
                `UPDATE Vehicles SET availability_status='available' WHERE id=$1`,
                [booking.vehicle_id]
            );
        }

        return expiredBookings.rows.length;
    }

export const bookingsService = {
    bookVehicle,
    getBookings,
    cancelBookings,
    markAsReturned,
    autoReturnExpiredBookings
}