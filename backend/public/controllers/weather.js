"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const weatherRouter = require("express").Router();
const mockData = require("./mockData");
const { Weather } = require("../models");
weatherRouter.get("/bridge", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenUrl = "https://eu-central.aws.thinger.io:443/oauth/token";
        const tokenHeaders = {
            "Content-Type": "application/x-www-form-urlencoded",
        };
        const tokenData = "grant_type=password&username=Rubes&password=Meca.TESJo01";
        const tokenResponse = yield fetch(tokenUrl, {
            method: "POST",
            headers: tokenHeaders,
            body: tokenData,
        });
        if (!tokenResponse.ok) {
            throw new Error(`Error en la solicitud: ${tokenResponse.status} - ${tokenResponse.statusText}`);
        }
        const tokenInfo = yield tokenResponse.json();
        const token = tokenInfo.access_token;
        const dataBucketUrl = "https://eu-central.aws.thinger.io:443/v1/users/Rubes/buckets/Variables_Meteorologicas/data";
        const dataHeaders = {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
        };
        const dataResponse = yield fetch(dataBucketUrl, {
            method: "GET",
            headers: dataHeaders,
        });
        if (!dataResponse.ok) {
            throw new Error(`Error en la solicitud de datos: ${dataResponse.status} - ${dataResponse.statusText}`);
        }
        console.log(dataResponse);
        const data = yield dataResponse.json();
        const newDataArray = data.map((item) => {
            const date = new Date(item.ts);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return {
                timestamp: item.ts,
                fecha: `${year}-${month}-${day}`,
                hora: date.getHours(),
                minuto: date.getMinutes(),
                direccion: item.val.DIRECCION,
                humedad: item.val.HUMEDAD,
                lluvia: item.val.LLUVIA,
                luz: item.val.LUZ,
                presion: item.val.PRESION,
                temperatura: item.val.TEMPERATURA,
                velocidad: item.val.VELOCIDAD,
            };
        });
        const insertedData = yield Weather.bulkCreate(newDataArray, {
            ignoreDuplicates: true,
        });
        res.status(201).json(insertedData);
    }
    catch (error) {
        console.error(error);
    }
}));
weatherRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("TESJo Clima API ----- Developed by AppSiDaL");
}));
weatherRouter.get("/landing", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(mockData.landingData);
}));
weatherRouter.get("/now", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(mockData.now);
}));
weatherRouter.get("/hours", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(mockData.hours);
}));
module.exports = weatherRouter;
