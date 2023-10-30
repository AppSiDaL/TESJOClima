const weatherRouter = require("express").Router();
import { Response, Request } from "express";
const mockData = require("./mockData");
weatherRouter.get("/", async (_req: Request, res: Response) => {
  res.send("TESJo Clima API ----- Developed by AppSiDaL");
});

weatherRouter.get("/landing", async (_req: Request, res: Response) => {
  res.json(mockData.landingData);
});

weatherRouter.get("/now", async (_req: Request, res: Response) => {
  res.json(mockData.now);
});

weatherRouter.get("/hours", async (_req: Request, res: Response) => {
  res.json(mockData.hours);
});

module.exports = weatherRouter;
