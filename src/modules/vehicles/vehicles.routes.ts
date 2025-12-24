import express from "express"
import { vehiclesController } from "./vehicles.controllers"
import roleAuth from "../../middleware/roleAuth"

const router = express.Router()

router.post("/", roleAuth("admin"), vehiclesController.addVehicles)
router.get("/", vehiclesController.getAllVehicles)
router.get("/:vehicleId", vehiclesController.getSingleVehicleDetails)
router.put("/:vehicleId", roleAuth("admin"), vehiclesController.updateVehicleDetails)
router.delete("/:vehicleId", roleAuth("admin"), vehiclesController.deleteVehicle)

export const vehiclesRoutes = router;