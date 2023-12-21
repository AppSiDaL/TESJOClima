const weatherRouter = require("express").Router();
import { Response, Request } from "express";
import { SQLTesjoResponse, landingProps } from "../types";
import {
  calculateRainProbability,
  determineWeatherState,
} from "../utils/weather";
const mockData = require("./mockData");
const { Weather } = require("../models");
const moment = require("moment-timezone");

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
      const date = moment(item.ts).tz("America/Mexico_City");
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
  const actualValue:SQLTesjoResponse[] = await Weather.findAll({
    limit: 1,
    order: [["timestamp", "DESC"]],
  });
  const response: landingProps = {
    actual: {
      hora: actualValue[0].dataValues.hora,
      date: actualValue[0].dataValues.fecha,
      temperatura: actualValue[0].dataValues.temperatura,
      estado_tiempo: determineWeatherState(actualValue[0].dataValues),
      porcentaje_lluvia: calculateRainProbability(actualValue[0].dataValues),
      confort: [
        { name: "humedad", value: actualValue[0].dataValues.humedad },
        { name: "lluvia", value: actualValue[0].dataValues.lluvia },
        { name: "luz", value: actualValue[0].dataValues.luz },
        { name: "presion", value: actualValue[0].dataValues.presion },
        { name: "viento", value: actualValue[0].dataValues.velocidad },
        { name: "direccion", value: actualValue[0].dataValues.direccion },
      ],
    },
    next48: [],
    week: [],
  };
  res.status(200).json(response);
});

weatherRouter.get("/now", async (_req: Request, res: Response) => {
  res.json(mockData.now);
});

weatherRouter.get("/hours", async (_req: Request, res: Response) => {
  res.json(mockData.hours);
});

module.exports = weatherRouter;
