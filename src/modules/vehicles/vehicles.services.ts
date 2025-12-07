import { pool } from "../../config/db";

const addVehicles = async(payload: Record<string, unknown>) =>{
    const {vehicles_name, type, registration_number, daily_rent_price, availability_status} = payload;

    const result = await pool.query(`INSERT INTO Vehicles(vehicles_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicles_name, type, registration_number, daily_rent_price, availability_status])

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
    const {vehicles_name, daily_rent_price, availability_status} = payload;

    const result = await pool.query(`UPDATE Vehicles SET vehicles_name=$1, daily_rent_price=$2, availability_status=$3 WHERE id=$4 RETURNING *`, [vehicles_name, daily_rent_price, availability_status, id])

    return result;
}

const deleteVehicle = async(id: string) =>{
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