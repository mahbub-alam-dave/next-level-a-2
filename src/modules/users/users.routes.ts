import express from "express"
import { usersControllers } from "./users.controllers"
import auth from "../../middleware/auth";

const router = express.Router()


router.get("/", auth("admin"), usersControllers.getAllUser)

export const usersRoutes = router;