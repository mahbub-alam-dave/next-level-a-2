import {pool} from "../../config/db"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import config from "../../config/config";

const signupUser = async (payload: Record<string, unknown>) =>{
    const {name, email, password, phone, role} = payload;
    
    const hashedPassword = await bcrypt.hash(password as string, 10)

    const result = await pool.query(`
        INSERT INTO Users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [name, email, hashedPassword, phone, role])
    return result;
}

const signinUser =async(email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM Users WHERE email=$1`, [email])

    if(result.rows.length === 0) {
        return null;
    }

    const user = result.rows[0]
    console.log(user)

    const isMatched = await bcrypt.compare(password, user.password);

    if(!isMatched) {
        return false
    }

    // const secret =  "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
    const secret = config.jwtSecret;
    const token = jwt.sign({name: user.name, email: user.email, role: user.role, id: user.id}, secret as string, { expiresIn: "7d"})

    // console.log(token, user)
    return {token, user}
}

export const authServices ={
    signupUser,
    signinUser
}