import express from "express"
import { vehiclesController } from "./vehicles.controllers"
import roleAuth from "../../middleware/roleAuth"

const router = express.Router()

router.post("/", roleAuth("admin"), vehiclesController.addVehicles)

export const vehiclesRoutes = router;