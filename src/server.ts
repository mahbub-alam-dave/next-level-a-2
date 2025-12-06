import express, { Request, Response } from 'express'
import {Pool} from "pg"
import dotenv from "dotenv"
import path from "path"
dotenv.config({path: path.join(process.cwd(), ".env")})
const app = express()
const port = 5000
app.use(express.json())

const pool = new Pool({
    connectionString: `${process.env.CONNECTION_STR}`
})

const initDB = async() => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(10) NOT NULL,
        CONSTRAINT Chk_PassLength CHECK (LENGTH(password) >= 6),
        CONSTRAINT Chk_UserRole CHECK (role IN ('admin', 'user'))
        )`),

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Vehicles(
      id SERIAL PRIMARY KEY,
      vehicles_name VARCHAR(100) NOT NULL,
      type VARCHAR(20) NOT NULL,
      registration_number VARCHAR(100) UNIQUE NOT NULL,
      daily_rent_price INT NOT NULL,
      availability_status VARCHAR(15),
      CONSTRAINT Chk_Vehicles_Type CHECK (type IN ('car', 'bike', 'van', 'SUV')),
      CONSTRAINT Chk_Daily_rent CHECK (daily_rent_price > 0),
      CONSTRAINT Chk_Availability CHECK (availability_status IN ('available', 'booked')) 
      )`),  
      
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Bookings(
      id SERIAL PRIMARY KEY,
      customer_id INT REFERENCES Users(id) ON DELETE CASCADE,
      vehicle_id INT REFERENCES Vehicles(id) ON DELETE CASCADE,
      rent_start_date TIMESTAMP NOT NULL,
      rent_end_date TIMESTAMP NOT NULL,
      total_price INT NOT NULL,
      status VARCHAR(15) NOT NULL,
      CONSTRAINT Chk_rent_end_date CHECK (rent_end_date > rent_start_date),
      CONSTRAINT Chk_total_price CHECK (total_price > 0),
      CONSTRAINT Chk_status CHECK (status IN ('active', 'cancelled', 'returned'))
      )`)
}

initDB()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
