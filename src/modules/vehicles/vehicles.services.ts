import { pool } from "../../config/db";

const addVehicles = async(payload: Record<string, unknown>) =>{
    const {vehicles_name, type, registration_number, daily_rent_price, availability_status} = payload;

    const result = await pool.query(`INSERT INTO Vehicles(vehicles_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicles_name, type, registration_number, daily_rent_price, availability_status])

    return result;
}

export const vehiclesServices ={
    addVehicles,
}