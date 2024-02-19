import { Router } from "express";
import { users } from "../data/users";
import { deleteUserHandler } from "../controllers/user.controller";

// creamo una istanza di router;
export const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", addUserHandler);
router.delete("/:id", deleteUserHandler);
router.patch("/:id", updateUserHandler);