import {pool} from "../../config/db"
const signupUser = async (name: string, email: string) =>{
    const result = await pool.query(`
        INSERT INTO Users(name, email) VALUES($1, $2) RETURNING *
        `, [name, email])
    return result
}

export const authServices ={
    signupUser,
}