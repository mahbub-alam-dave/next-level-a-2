import { pool } from "../../config/db"

const getUser = async () => {
    const result = await pool.query(`SELECT * FROM Users`)
    return result;
}

const updateUserData = async(userData: Record<string, unknown>, id: string) => {
    const {name, phone} = userData;

   const result = await pool.query(`
    UPDATE Users SET name=$1, phone=$2 WHERE id=$3 RETURNING *`,[name, phone, id])

    return result;
}


export const userServices ={
    getUser,
    updateUserData,
}