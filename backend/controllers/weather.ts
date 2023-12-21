const weatherRouter = require("express").Router();
import { Response, Request } from "express";
import { landingProps } from "../types";
const mockData = require("./mockData");
const { Weather } = require("../models");
const moment = require("moment-timezone")

weatherRouter.get("/bridge", async (_req: Request, res: Response) => {
  try {
    const tokenUrl = "https://eu-central.aws.thinger.io:443/oauth/token";
    const tokenHeaders = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const tokenData =
      "grant_type=password&username=Rubes&password=Meca.TESJo01";

    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: tokenHeaders,
      body: tokenData,
    });

    if (!tokenResponse.ok) {
      throw new Error(
        `Error en la solicitud: ${tokenResponse.status} - ${tokenResponse.statusText}`
      );
    }

    const tokenInfo = await tokenResponse.json();
    const token = tokenInfo.access_token;

    const dataBucketUrl =
      "https://eu-central.aws.thinger.io:443/v1/users/Rubes/buckets/Variables_Meteorologicas/data";
    const dataHeaders = {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const dataResponse = await fetch(dataBucketUrl, {
      method: "GET",
      headers: dataHeaders,
    });

    if (!dataResponse.ok) {
      throw new Error(
        `Error en la solicitud de datos: ${dataResponse.status} - ${dataResponse.statusText}`
      );
    }
    console.log(dataResponse);

    const data = await dataResponse.json();

    const newDataArray = data.map((item: any) => {
      const date = moment(item.ts).tz('America/Mexico_City');
      const day = date.date();
      const month = date.month() + 1;
      const year = date.year();
      return {
        timestamp: item.ts,
        fecha: `${year}-${month}-${day}`,
        hora: date.hours(),
        minuto: date.minutes(),
        direccion: item.val.DIRECCION,
        humedad: item.val.HUMEDAD,
        lluvia: item.val.LLUVIA,
        luz: item.val.LUZ,
        presion: item.val.PRESION,
        temperatura: item.val.TEMPERATURA,
        velocidad: item.val.VELOCIDAD,
      };
    });

    const insertedData = await Weather.bulkCreate(newDataArray, {
      ignoreDuplicates: true,
    });
    res.status(201).json(insertedData);
  } catch (error) {
    console.error(error);
  }
});

weatherRouter.get("/", async (_req: Request, res: Response) => {
  res.send("TESJo Clima API ----- Developed by AppSiDaL");
});

weatherRouter.get("/landing", async (_req: Request, res: Response) => {
  const actualValue = await Weather.findAll({
    limit: 1,
    order: [["timestamp", "DESC"]],
  });
  const response:landingProps={
    actual:actualValue[0].dataValues,
    next48:[],
    week:[]
  }
  console.log(response);
  res.status(200).json({data:actualValue[0].dataValues.fecha});
});

weatherRouter.get("/now", async (_req: Request, res: Response) => {
  res.json(mockData.now);
});

weatherRouter.get("/hours", async (_req: Request, res: Response) => {
  res.json(mockData.hours);
});

module.exports = weatherRouter;
