import express from "express"
import { bookingsController } from "./bookings.controllers"
import auth from "../../middleware/auth";
import roleAuth from "../../middleware/roleAuth";

const router = express.Router()

router.post("/", auth(), bookingsController.bookVehicles)
router.get("/", auth(), bookingsController.getBookings)
router.put("/cancel/:id", auth(), bookingsController.cancelBooking); 
router.put("/return/:id", roleAuth("admin"), bookingsController.markAsReturned); 
router.get("/auto-return", bookingsController.autoMarkBySystem); 

export const bookingsRoutes = router;