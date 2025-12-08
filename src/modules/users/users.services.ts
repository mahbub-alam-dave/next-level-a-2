import { Query } from "pg";
import { pool } from "../../config/db"

const getUser = async () => {
    const result = await pool.query(`SELECT * FROM Users`)
    return result;
}

const updateUserData = async(userData: Record<string, unknown>, id: string) => {
    const fields: string[]= [];
    const values: any[] = [];
    let index = 1;

    for(const key in userData) {
        if(userData[key] !== undefined && userData[key] !== null){
            fields.push(`${key} = $${index}`)
            values.push(userData[key])
            index++
        }
    }

    console.log(userData)

    if(fields.length === 0){
        throw new Error("No fields provided to update")
    }

    values.push(id)

    const query= `
    UPDATE Users SET ${fields.join(", ")} WHERE id =$${index} RETURNING *
    `

   const result = await pool.query(query, values)

    return result;
}

const deleteUser = async(id: string) =>{
    const isActiveBookings = await pool.query(`SELECT * FROM Bookings where customer_id=$1 AND status = 'active'`,[id])
    
    if (isActiveBookings.rows.length > 0) {
        throw new Error("Users cannot be deleted. Active bookings exist.");
    }
    const result = await pool.query(`DELETE FROM Users WHERE id=$1`, [id])

    return result;
}


export const userServices ={
    getUser,
    updateUserData,
    deleteUser,
    
}