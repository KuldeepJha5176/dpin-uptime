import express from "express";
import { authMiddleware } from "./middleware";
import { prismaClient } from "../../packages/db/src/index";

const app  = express();

app.use(express.json());

app.post("/api/vi/website", authMiddleware , async (req,res) => {
    const userId = req.userId!;
    const { url } = req.body;

    const data = await prismaClient.website.create({
        data: {
            userId, 
            url
        }
    })
    res.json({
        id: data.id
    })



})

app.get("/api/vi/websites/status", authMiddleware , async (req,res) => {
    const websiteId = req.query.websiteId! as unknown as string  ;
    const userId = req.userId!;
    const data = await prismaClient.website.findFirst({
        where: {
            id: websiteId,
            userId,
            disabled : false
        },
        include: {
            ticks: true
        }
    })
    res.json(data)

})
app.get("/api/vi/websites", authMiddleware, async (req,res) =>{
    const userId = req.userId!;

    const websites = await prismaClient.website.findMany({
        where: {
            userId,
            disabled : false
        },
        include: {
            ticks: true
        }
    })
        res.json({
            websites,

        })

   
})
app.delete("/api/vi/website/",authMiddleware, async(req,res) =>{
    const userId = req.userId!;
    const websiteId = req.body.website;

    await prismaClient.website.update({
        where: {
            id: websiteId,
            userId
        },
        data : {
            disabled : true
        }
    })
    res.json({
        message: "Deleted website successfully "
    })


})

app.listen(8080);