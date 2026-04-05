import express from "express";
import type {Router} from "express"
import { registerHandler, loginHandler, handleMe } from "./controller";
import { authenticationMiddleware, restrictToAuthenticatedUser } from "../middleware/auth.middleware";
import { asyncHandler } from "../middleware/async-handler";

const router: Router = express.Router();

router.post("/register", asyncHandler(registerHandler));
router.post("/login", asyncHandler(loginHandler));

router.get('/profile', authenticationMiddleware(), restrictToAuthenticatedUser(), asyncHandler(handleMe))

export default router;