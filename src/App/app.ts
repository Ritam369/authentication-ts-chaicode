import express from "express";
import type { Express } from "express";
import router from "./auth/routes"

export function createApplication(): Express {
    const app = express();
    
    //Middleware
    app.use(express.json());

    //Routes
    app.get('/', (req, res) => {
        res.status(200).json("Welcome to Ritam's Authentication Service");
    });

    app.use("/auth", router)

    return app;
}