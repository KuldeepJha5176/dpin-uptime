import express from "express";
import { authMiddleware } from "./middleware";
import { prismaClient } from "db/client";

const app  = express();


app.post("/api/vi/website", authMiddleware , (req,res) => {
    const userId = req.userId

    prismaClient.user.create({

    })
})
app.get("/api/vi/websites/status", authMiddleware ,  (req,res) => {

})
app.get("/api/vi/websites", authMiddleware, (req,res) =>{

})
app.delete("/api/vi/website/",authMiddleware, (req,res) =>{

})

app.listen(3000);