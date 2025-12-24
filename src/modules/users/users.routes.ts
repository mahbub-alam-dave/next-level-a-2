import express from "express"
import { usersControllers } from "./users.controllers"
import adminAuth from "../../middleware/roleAuth";
import isOwnerOrAdmin from "../../middleware/isOwnerOrAdmin";
import auth from "../../middleware/auth";

const router = express.Router()


router.get("/", adminAuth("admin"), usersControllers.getAllUser)
router.put("/:userId", auth(), isOwnerOrAdmin, usersControllers.updateUserData)
router.delete("/:userId", adminAuth("admin"), usersControllers.deleteUser)

export const usersRoutes = router;