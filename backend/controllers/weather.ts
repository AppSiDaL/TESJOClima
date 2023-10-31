const weatherRouter = require("express").Router();
import { Response, Request } from "express";
const mockData = require("./mockData");

weatherRouter.get('/bridge', async (_req:Request, res:Response) => {
  const tokenUrl = 'https://eu-central.aws.thinger.io:443/oauth/token';

  const tokenHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  
  const tokenData = 'grant_type=password&username=Rubes&password=Meca.TESJo01';
  
  fetch(tokenUrl, {
    method: 'POST',
    headers: tokenHeaders,
    body: tokenData,
  })
    .then(async (tokenResponse) => {
      if (!tokenResponse.ok) {
        throw new Error(`Error en la solicitud: ${tokenResponse.status} - ${tokenResponse.statusText}`);
      }
  
      const tokenInfo = await tokenResponse.json();
      const token = tokenInfo.access_token;
  
      const dataBucketUrl = 'https://eu-central.aws.thinger.io:443/v1/users/Rubes/buckets/Variables_Meteorologicas/data';
      const dataHeaders = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
  
      fetch(dataBucketUrl, {
        method: 'GET',
        headers: dataHeaders,
      })
        .then(async (dataResponse) => {
          if (!dataResponse.ok) {
            throw new Error(`Error en la solicitud de datos: ${dataResponse.status} - ${dataResponse.statusText}`);
          }
          const data = await dataResponse.json();
          console.log(data);
          res.json(data);
        })
        .catch(dataError => {
          console.error(dataError);
        });
    })
    .catch(tokenError => {
      console.error(tokenError);
    });
})

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
