import express from "express";
import type {Router} from "express"
import { registerHandler, loginHandler, handleMe } from "./controller";
import { authenticationMiddleware, restrictToAuthenticatedUser } from "../middleware/auth.middleware";

const router: Router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);

router.get('/profile', authenticationMiddleware(), restrictToAuthenticatedUser(), handleMe)

export default router;