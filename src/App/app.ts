import express from "express";
import type { Express } from "express";

export function createApplication(): Express {
    const app = express();
    app.use(express.json());

    //Middleware

    //Routes
    app.get('/', (req, res) => {
        res.status(200).json("Welcome to Ritam's Authentication Service");
    });

    return app;
}