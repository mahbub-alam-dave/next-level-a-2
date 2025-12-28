import { pool } from "../../config/db";

const addVehicles = async(payload: Record<string, unknown>) =>{
    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = payload;

    const result = await pool.query(`INSERT INTO Vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status])

    return result;
}


const getAllVehicles = async () => {
    const result = await pool.query(`SELECT * FROM Vehicles`)
    return result;
}

const getVehicleDetails = async (id: string) => {
    const result = await pool.query(`SELECT * FROM Vehicles WHERE id=$1`,[id])
    return result;
}

const updateVehicleDetails = async (payload: Record<string, unknown>, id: string) => {
    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = payload;

    const result = await pool.query(`UPDATE Vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status, id])

    return result;
}

const deleteVehicle = async(id: string) =>{
    const isActiveBookings = await pool.query(`SELECT * FROM Bookings where vehicle_id=$1 AND status = 'active'`,[id])
    
 if (isActiveBookings.rows.length > 0) {
        throw new Error("Vehicle cannot be deleted. Active bookings exist.");
    }
    const result = await pool.query(`DELETE FROM Vehicles WHERE id=$1`, [id])
    return result;
}

export const vehiclesServices ={
    addVehicles,
    getAllVehicles,
    getVehicleDetails,
    updateVehicleDetails,
    deleteVehicle,
}