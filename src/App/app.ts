import express from "express";
import type { Express } from "express";
import router from "./auth/routes"
import { errorHandler } from "./middleware/error.middleware";

export function createApplication(): Express {
    const app = express();
    
    //Middleware
    app.use(express.json());
    // app.use(authenticationMiddleware())

    //Routes
    app.get('/', (req, res) => {
        res.status(200).json("Welcome to Ritam's Authentication Service");
    });

    app.use("/auth", router)

    //Error Handler (must be last)
    app.use(errorHandler)

    return app;
}