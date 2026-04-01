import express from "express";
import type {Router} from "express"
import { registerHandler, loginHandler } from "./controller";

const router: Router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);

export default router;