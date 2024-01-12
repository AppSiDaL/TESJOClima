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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const weatherRouter = require("express").Router();
const weather_1 = require("../utils/weather");
const { Weather, Prediction } = require("../models");
const moment = require("moment-timezone");
const sequelize_1 = require("sequelize");
const aqiService_1 = __importDefault(require("../services/aqiService"));
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
    const currentHour = moment().tz("America/Mexico_City").hour();
    const currentDate = moment().tz("America/Mexico_City").startOf("day");
    const nextDate = moment(currentDate).add(1, "day");
    const secondNextDate = moment(currentDate).add(2, "day");
    const actualValue = yield Weather.findOne({
        order: [["timestamp", "DESC"]],
    });
    const restOfDayPredictions = yield Prediction.findAll({
        where: {
            fecha: {
                [sequelize_1.Op.eq]: currentDate.toISOString(),
            },
            hora: {
                [sequelize_1.Op.gte]: currentHour,
            },
        },
        limit: (24 - currentHour) * 60,
        order: [["timestamp", "ASC"]],
    });
    const nextDayPredictions = yield Prediction.findAll({
        where: {
            fecha: {
                [sequelize_1.Op.eq]: nextDate.toISOString(),
            },
        },
        limit: 24 * 60,
        order: [["timestamp", "ASC"]],
    });
    const secondNextDayPredictions = yield Prediction.findAll({
        where: {
            fecha: {
                [sequelize_1.Op.eq]: secondNextDate.toISOString(),
            },
            hora: {
                [sequelize_1.Op.lt]: currentHour,
            },
        },
        limit: currentHour * 60,
        order: [["timestamp", "ASC"]],
    });
    const next48PredictionFirst = restOfDayPredictions.filter((_, index) => index % 60 === 0);
    const next48PredictionsSecond = nextDayPredictions.filter((_, index) => index % 60 === 0);
    const next48PredictionsThird = secondNextDayPredictions.filter((_, index) => index % 60 === 0);
    const next48HoursPredictions = [
        ...next48PredictionFirst,
        ...next48PredictionsSecond,
        ...next48PredictionsThird,
    ];
    const actual = {
        hora: actualValue.dataValues.hora,
        date: actualValue.dataValues.fecha,
        temperatura: actualValue.dataValues.temperatura,
        estado_tiempo: (0, weather_1.determineWeatherState)(actualValue.dataValues),
        porcentaje_lluvia: (0, weather_1.calculateRainProbability)(actualValue.dataValues),
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
        velocidad_viento: value.dataValues.velocidad,
        direccion_viento: value.dataValues.direccion,
        estado_tiempo: (0, weather_1.determineWeatherState)(value.dataValues),
        porcentaje_lluvia: (0, weather_1.calculateRainProbability)(value.dataValues),
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
        let forecasts = yield Prediction.findAll({
            where: {
                fecha: {
                    [sequelize_1.Op.between]: [
                        date.startOf("day").toISOString(),
                        date.endOf("day").toISOString(),
                    ],
                },
            },
            order: [["timestamp", "DESC"]],
        });
        if (forecasts.length > 0) {
            let minTemp = forecasts.reduce((min, p) => p.dataValues.temperatura < min ? p.dataValues.temperatura : min, forecasts[0].dataValues.temperatura);
            let maxTemp = forecasts.reduce((max, p) => p.dataValues.temperatura > max ? p.dataValues.temperatura : max, forecasts[0].dataValues.temperatura);
            week.push({
                dia: date.format("dddd"),
                fecha: date.format("YYYY-MM-DD"),
                pronostico: (0, weather_1.determineWeatherState)(forecasts[0].dataValues),
                porcentaje_lluvia: (0, weather_1.calculateRainProbability)(forecasts[0].dataValues),
                velocidad_viento: forecasts[0].dataValues.velocidad,
                direccion_viento: forecasts[0].dataValues.direccion,
                temperatura_minima: minTemp,
                temperatura_maxima: maxTemp,
            });
        }
    }
    const response = {
        actual: actual,
        next48: next48,
        week: week,
    };
    res.status(200).json(response);
}));
weatherRouter.get("/now", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const moments = {
            madrugada: { start: 0, end: 6 },
            mañana: { start: 6, end: 12 },
            tarde: { start: 12, end: 18 },
            noche: { start: 18, end: 23 },
        };
        const formattedPronostics = [];
        for (let moment in moments) {
            const start = new Date(today);
            start.setHours(moments[moment].start, 0, 0, 0);
            const end = new Date(today);
            end.setHours(moments[moment].end, 0, 0, 0);
            let pronostic;
            if (new Date() < end) {
                pronostic = yield Prediction.findOne({
                    where: {
                        fecha: {
                            [sequelize_1.Op.between]: [start, end],
                        },
                        hora: {
                            [sequelize_1.Op.between]: [start.getHours(), end.getHours()],
                        },
                    },
                    order: [["fecha", "DESC"]],
                });
            }
            else {
                pronostic = yield Weather.findOne({
                    where: {
                        fecha: {
                            [sequelize_1.Op.between]: [start, end],
                        },
                        hora: {
                            [sequelize_1.Op.between]: [start.getHours(), end.getHours()],
                        },
                    },
                    order: [["fecha", "DESC"]],
                });
            }
            if (pronostic) {
                formattedPronostics.push({
                    momento: moment,
                    fecha: pronostic.dataValues.fecha,
                    temperatura: pronostic.dataValues.temperatura,
                    tiempo: (0, weather_1.determineWeatherState)(pronostic.dataValues),
                    probabilidad_de_lluvia: (0, weather_1.calculateRainProbability)(pronostic.dataValues),
                });
            }
        }
        const todayPronostic = yield Weather.findOne({
            order: [["timestamp", "DESC"]],
        });
        const airQuality = yield aqiService_1.default.getAirQuality();
        const todayPronosticFormatted = {
            hora: todayPronostic.dataValues.hora,
            date: todayPronostic.dataValues.fecha,
            tempeture: todayPronostic.dataValues.temperatura,
            airQuality: airQuality,
            sunrise: (0, weather_1.getSunsetSunrise)().sunrise,
            sunset: (0, weather_1.getSunsetSunrise)().sunset,
            estado_tiempo: (0, weather_1.determineWeatherState)(todayPronostic.dataValues),
            porcentaje_lluvia: (0, weather_1.calculateRainProbability)(todayPronostic.dataValues),
            confort: [
                { name: "humedad", value: todayPronostic.dataValues.humedad },
                { name: "lluvia", value: todayPronostic.dataValues.lluvia },
                { name: "luz", value: todayPronostic.dataValues.luz },
                { name: "presion", value: todayPronostic.dataValues.presion },
                { name: "viento", value: todayPronostic.dataValues.velocidad },
                { name: "direccion", value: todayPronostic.dataValues.direccion },
            ],
        };
        const currentHour = new Date().getHours();
        const hours = [
            currentHour + 1,
            currentHour + 2,
            currentHour + 3,
            currentHour + 4,
        ];
        const hourPronostics = [];
        for (let hour of hours) {
            const nextHour = hour + 1;
            const pronostic = yield Prediction.findOne({
                where: {
                    fecha: new Date(),
                    hora: {
                        [sequelize_1.Op.gte]: hour,
                        [sequelize_1.Op.lt]: nextHour,
                    },
                },
                order: [
                    ["fecha", "DESC"],
                    ["hora", "DESC"],
                    ["minuto", "DESC"],
                ],
            });
            if (pronostic) {
                hourPronostics.push({
                    momento: `${hour}:00`,
                    fecha: pronostic.dataValues.fecha,
                    temperatura: pronostic.dataValues.temperatura,
                    tiempo: (0, weather_1.determineWeatherState)(pronostic.dataValues),
                    probabilidad_de_lluvia: (0, weather_1.calculateRainProbability)(pronostic.dataValues),
                });
            }
        }
        const currentDate = new Date();
        const days = [1, 2, 3, 4, 5];
        const dialyPronostics = [];
        for (let day of days) {
            const start = new Date(currentDate);
            start.setDate(currentDate.getDate() + day);
            start.setHours(0, 0, 0, 0);
            const end = new Date(currentDate);
            end.setDate(currentDate.getDate() + day);
            end.setHours(23, 59, 59, 999);
            const pronostic = yield Prediction.findOne({
                where: {
                    fecha: {
                        [sequelize_1.Op.between]: [start, end],
                    },
                },
                order: [["fecha", "DESC"]],
            });
            if (pronostic) {
                dialyPronostics.push({
                    momento: `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}`,
                    temperatura: pronostic.dataValues.temperatura,
                    tiempo: (0, weather_1.determineWeatherState)(pronostic.dataValues),
                    probabilidad_de_lluvia: (0, weather_1.calculateRainProbability)(pronostic.dataValues),
                });
            }
        }
        const response = {
            todayPronostic: formattedPronostics,
            confortValues: todayPronosticFormatted,
            hourPronostic: hourPronostics,
            dialyPronostics: dialyPronostics,
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "An error occurred while fetching the pronostics." });
    }
}));
weatherRouter.get("/hours", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentHour = moment().tz("America/Mexico_City").hour();
    const currentDate = moment().tz("America/Mexico_City").startOf("day");
    const nextDate = moment(currentDate).add(1, "day");
    const secondNextDate = moment(currentDate).add(2, "day");
    const restOfDayPredictions = yield Prediction.findAll({
        where: {
            fecha: {
                [sequelize_1.Op.eq]: currentDate.toISOString(),
            },
            hora: {
                [sequelize_1.Op.gte]: currentHour,
            },
        },
        limit: (24 - currentHour) * 60,
        order: [["timestamp", "ASC"]],
    });
    const nextDayPredictions = yield Prediction.findAll({
        where: {
            fecha: {
                [sequelize_1.Op.eq]: nextDate.toISOString(),
            },
        },
        limit: 24 * 60,
        order: [["timestamp", "ASC"]],
    });
    const secondNextDayPredictions = yield Prediction.findAll({
        where: {
            fecha: {
                [sequelize_1.Op.eq]: secondNextDate.toISOString(),
            },
            hora: {
                [sequelize_1.Op.lt]: currentHour,
            },
        },
        limit: currentHour * 60,
        order: [["timestamp", "ASC"]],
    });
    const next48PredictionFirst = restOfDayPredictions.filter((_, index) => index % 60 === 0);
    const next48PredictionsSecond = nextDayPredictions.filter((_, index) => index % 60 === 0);
    const next48PredictionsThird = secondNextDayPredictions.filter((_, index) => index % 60 === 0);
    const next48HoursPredictions = [
        ...next48PredictionFirst,
        ...next48PredictionsSecond,
        ...next48PredictionsThird,
    ];
    const next48 = next48HoursPredictions.map((value) => ({
        hora: value.dataValues.hora,
        date: value.dataValues.fecha,
        temperatura: value.dataValues.temperatura,
        estado_tiempo: (0, weather_1.determineWeatherState)(value.dataValues),
        porcentaje_lluvia: (0, weather_1.calculateRainProbability)(value.dataValues),
        velocidad_viento: value.dataValues.velocidad,
        direccion_viento: value.dataValues.direccion,
        humedad: value.dataValues.humedad,
        luz: value.dataValues.luz,
        presion: value.dataValues.presion,
        lluvia: value.dataValues.lluvia,
    }));
    res.status(200).json(next48);
}));
module.exports = weatherRouter;
