const weatherRouter = require("express").Router();
import { Response, Request } from "express";
const mockData = require("./mockData");
const { Weather } = require("../models");

weatherRouter.get("/bridge", async (_req: Request, res: Response) => {
  const tokenUrl = "https://eu-central.aws.thinger.io:443/oauth/token";

  const tokenHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const tokenData = "grant_type=password&username=Rubes&password=Meca.TESJo01";

  fetch(tokenUrl, {
    method: "POST",
    headers: tokenHeaders,
    body: tokenData,
  })
    .then(async (tokenResponse) => {
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

      fetch(dataBucketUrl, {
        method: "GET",
        headers: dataHeaders,
      })
        .then(async (dataResponse) => {
          if (!dataResponse.ok) {
            throw new Error(
              `Error en la solicitud de datos: ${dataResponse.status} - ${dataResponse.statusText}`
            );
          }
          const data = await dataResponse.json();

          const newDataArray = []; // Array para almacenar los nuevos datos

          for (let i = 0; i < data.length; i++) {
            const date = new Date(data[i].ts);
            const day = date.getDate(); // Día del mes (1-31)
            const month = date.getMonth() + 1; // Mes (0-11, por lo que añadimos 1 para obtener 1-12)
            const year = date.getFullYear(); // Año
            const newData = {
              timestamp: data[i].ts,
              fecha: `${year}-${month}-${day}`,
              hora: date.getHours(),
              minuto: date.getMinutes(),
              direccion: data[i].val.DIRECCION,
              humedad: data[i].val.HUMEDAD,
              lluvia: data[i].val.LLUVIA,
              luz: data[i].val.LUZ,
              presion: data[i].val.PRESION,
              temperatura: data[i].val.TEMPERATURA,
              velocidad: data[i].val.VELOCIDAD,
            };
            newDataArray.push(newData); // Agregar los nuevos datos al array
          }

          try {
            const insertedData = await Weather.bulkCreate(newDataArray, {
              ignoreDuplicates: true,
            });
            res.status(201).json(insertedData);
          } catch (error) {
            console.error(error);
          }
        })
        .catch((dataError) => {
          console.error(dataError);
        });
    })
    .catch((tokenError) => {
      console.error(tokenError);
    });
});

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
