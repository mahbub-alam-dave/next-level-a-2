import { pool } from "../../config/db";
import dayjs from "dayjs";

const bookVehicle = async (bookingData: Record<string, unknown>) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status,
    vehicle_name,
    daily_rent_price,
  } = bookingData;

  const availability_status = "booked";

  const result = await pool.query(
    `INSERT INTO Bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
    ]
  );

  const vehicle = await pool.query(
    `UPDATE Vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,
    [availability_status, vehicle_id]
  );

  return { result, vehicle };
};

const getBookings = async (role: string, id: string) => {
  let query: string;
  let params: string[] = [];

  if (role === "admin") {
    query = `SELECT * FROM Bookings ORDER BY id DESC`;
  } else if (role === "customer") {
    query = `SELECT * FROM Bookings WHERE customer_id=$1 ORDER BY id DESC`;
    params = [id];
  } else {
    throw new Error("Invalid role");
  }

  const result = await pool.query(query, params);

  return result;
};

const updateBookings = async (
  bookingId: string,
  customerId: string,
  status: string,
  role: string
) => {
const queryStr = role === "admin" 
        ? `SELECT * FROM Bookings WHERE id=$1` 
        : `SELECT * FROM Bookings WHERE id=$1 AND customer_id=$2`;
    
    const queryParams = role === "admin" ? [bookingId] : [bookingId, customerId];
    const booking = await pool.query(queryStr, queryParams);

  if (booking.rows.length === 0) {
    throw new Error("Booking not found");
  }

  const data = booking.rows[0];

  if (role === "customer" && status === "cancel") {
    const today = dayjs().format("YYYY-MM-DD");

    if (dayjs(today).isAfter(dayjs(data.rent_start_date))) {
      throw new Error("Cannot cancel booking after start date");
    }

    // Cancel booking
    const updated = await pool.query(
      `UPDATE Bookings SET status='cancelled' WHERE id=$1 RETURNING *`,
      [bookingId]
    );

    return {
        data: updated.rows[0],
        message: "Your booking has been cancelled successfully."
    }
  }

  else if (role === "admin" && status === "return") {
    const returnedBooking = await pool.query(
      `
            UPDATE Bookings SET status='returned' WHERE id=$1 RETURNING *`,
      [bookingId]
    );

      // vehicle available again
  await pool.query(
    `UPDATE Vehicles SET availability_status='available' WHERE id=$1`,
    [data.vehicle_id]
  );

    return {
            data: returnedBooking.rows[0],
            message: "Vehicle returned successfully. The booking is now marked as completed."
        };
  }

  throw new Error("Invalid role action or status update request");
};



export const bookingsService = {
  bookVehicle,
  getBookings,
  updateBookings
};
