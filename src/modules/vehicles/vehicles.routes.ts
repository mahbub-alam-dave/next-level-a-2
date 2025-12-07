import express from "express"
import { vehiclesController } from "./vehicles.controllers"
import roleAuth from "../../middleware/roleAuth"

const router = express.Router()

router.post("/", roleAuth("admin"), vehiclesController.addVehicles)
router.get("/", vehiclesController.getAllVehicles)
router.get("/:id", vehiclesController.getSingleVehicleDetails)
router.put("/:id", roleAuth("admin"), vehiclesController.updateVehicleDetails)
router.delete("/:id", roleAuth("admin"), vehiclesController.deleteVehicle)

export const vehiclesRoutes = router;