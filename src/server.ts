import express, { Request, Response } from 'express'
import config from "./config/config.js"
import initDB from './config/db.js'
import {authRoutes} from "./modules/auth/auth.routes.js"
import {usersRoutes} from "./modules/users/users.routes.js"
import {vehiclesRoutes} from "./modules/vehicles/vehicles.routes.js"

const app = express()
const port = config.port
app.use(express.json())

// initializing db
initDB()

// auth routes
app.use("/api/v1/auth", authRoutes)
// users routes
app.use("/api/v1/users", usersRoutes)
// vehicles route
app.use("/api/v1/vehicles", vehiclesRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
