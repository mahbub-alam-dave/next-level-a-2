import express from "express"
import { bookingsController } from "./bookings.controllers"
import auth from "../../middleware/auth";
import roleAuth from "../../middleware/roleAuth";

const router = express.Router()

router.post("/", auth(), bookingsController.bookVehicles)
router.get("/", auth(), bookingsController.getBookings)
router.put('/:bookingId', auth(), bookingsController.updateBookings)

export const bookingsRoutes = router;