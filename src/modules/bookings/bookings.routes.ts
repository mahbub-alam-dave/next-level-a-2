import express from "express"
import { bookingsController } from "./bookings.controllers"
import auth from "../../middleware/auth";

const router = express.Router()

router.post("/", auth(), bookingsController.bookVehicles)

export const bookingsRoutes = router;