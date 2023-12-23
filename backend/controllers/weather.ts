const weatherRouter = require("express").Router();
import { Response, Request } from "express";
import { SQLTesjoResponse, landingProps } from "../types";
import {
  calculateRainProbability,
  determineWeatherState,
} from "../utils/weather";
const mockData = require("./mockData");
const { Weather, Prediction } = require("../models");
const moment = require("moment-timezone");
import { Op } from "sequelize";

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
  const currentHour = moment().tz("America/Mexico_City").hour();
  const currentDate = moment().tz("America/Mexico_City").startOf("day");
  const nextDate = moment(currentDate).add(1, "day");
  const secondNextDate = moment(currentDate).add(2, "day");

  const actualValue: SQLTesjoResponse = await Weather.findOne({
    order: [["timestamp", "DESC"]],
  });

  const restOfDayPredictions: SQLTesjoResponse[] = await Prediction.findAll({
    where: {
      fecha: {
        [Op.eq]: currentDate.toISOString(),
      },
      hora: {
        [Op.gte]: currentHour,
      },
    },
    limit: (24 - currentHour) * 60,
    order: [["timestamp", "ASC"]],
  });

  const nextDayPredictions: SQLTesjoResponse[] = await Prediction.findAll({
    where: {
      fecha: {
        [Op.eq]: nextDate.toISOString(),
      },
    },
    limit: 24 * 60,
    order: [["timestamp", "ASC"]],
  });

  const secondNextDayPredictions: SQLTesjoResponse[] = await Prediction.findAll(
    {
      where: {
        fecha: {
          [Op.eq]: secondNextDate.toISOString(),
        },
        hora: {
          [Op.lt]: currentHour,
        },
      },
      limit: currentHour * 60,
      order: [["timestamp", "ASC"]],
    }
  );

  const next48PredictionFirst = restOfDayPredictions.filter(
    (_, index) => index % 60 === 0
  );
  const next48PredictionsSecond = nextDayPredictions.filter(
    (_, index) => index % 60 === 0
  );
  const next48PredictionsThird = secondNextDayPredictions.filter(
    (_, index) => index % 60 === 0
  );

  const next48HoursPredictions = [
    ...next48PredictionFirst,
    ...next48PredictionsSecond,
    ...next48PredictionsThird,
  ];

  const actual = {
    hora: actualValue.dataValues.hora,
    date: actualValue.dataValues.fecha,
    temperatura: actualValue.dataValues.temperatura,
    estado_tiempo: determineWeatherState(actualValue.dataValues),
    porcentaje_lluvia: calculateRainProbability(actualValue.dataValues),
    confort: [
      { name: "humedad", value: actualValue.dataValues.humedad },
      { name: "lluvia", value: actualValue.dataValues.lluvia },
      { name: "luz", value: actualValue.dataValues.luz },
      { name: "presion", value: actualValue.dataValues.presion },
      { name: "viento", value: actualValue.dataValues.velocidad },
      { name: "direccion", value: actualValue.dataValues.direccion },
    ],
  };

  const next48 = next48HoursPredictions.map((value) => ({
    hora: value.dataValues.hora,
    date: value.dataValues.fecha,
    temperatura: value.dataValues.temperatura,
    estado_tiempo: determineWeatherState(value.dataValues),
    porcentaje_lluvia: calculateRainProbability(value.dataValues),
    confort: [
      { name: "humedad", value: value.dataValues.humedad },
      { name: "lluvia", value: value.dataValues.lluvia },
      { name: "luz", value: value.dataValues.luz },
      { name: "presion", value: value.dataValues.presion },
      { name: "viento", value: value.dataValues.velocidad },
      { name: "direccion", value: value.dataValues.direccion },
    ],
  }));
  let dates = [];
  for (let i = 0; i < 7; i++) {
    let date = moment().tz("America/Mexico_City").startOf("day").add(i, "days");
    dates.push(date);
  }

  let week = [];
  for (let date of dates) {
    let forecasts = await Prediction.findAll({
      where: {
        fecha: {
          [Op.between]: [
            date.startOf("day").toISOString(),
            date.endOf("day").toISOString(),
          ],
        },
      },
      order: [["timestamp", "DESC"]],
    });

    if (forecasts.length > 0) {
      let minTemp = forecasts.reduce(
        (min: any, p: any) =>
          p.dataValues.temperatura < min ? p.dataValues.temperatura : min,
        forecasts[0].dataValues.temperatura
      );
      let maxTemp = forecasts.reduce(
        (max: any, p: any) =>
          p.dataValues.temperatura > max ? p.dataValues.temperatura : max,
        forecasts[0].dataValues.temperatura
      );

      week.push({
        dia: date.format("dddd"),
        fecha: date.format("YYYY-MM-DD"),
        pronostico: determineWeatherState(forecasts[0].dataValues),
        temperatura_minima: minTemp,
        temperatura_maxima: maxTemp,
      });
    }
  }

  const response: landingProps = {
    actual: actual,
    next48: next48,
    week: week,
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
