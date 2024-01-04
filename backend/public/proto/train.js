"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const tf = __importStar(require("@tensorflow/tfjs-node"));
const { Weather } = require("../models");
// Define el modelo
const model = tf.sequential();
model.add(tf.layers.dense({ units: 64, activation: "relu", inputShape: [10] }));
model.add(tf.layers.dense({ units: 10, activation: "linear" }));
// Compila el modelo
model.compile({ loss: "meanSquaredError", optimizer: "sgd" });
// Carga los datos
Weather.findAll({})
    .then((results) => {
    const xs = tf.tensor2d(results.map((result) => [
        Number(result.dataValues.timestamp),
        Number(result.dataValues.hora),
        Number(result.dataValues.minuto),
        Number(result.dataValues.direccion),
        Number(result.dataValues.humedad),
        Number(result.dataValues.lluvia),
        Number(result.dataValues.luz),
        Number(result.dataValues.presion),
        Number(result.dataValues.temperatura),
        Number(result.dataValues.velocidad),
    ]));
    const ys = tf.tensor2d(results.map((result) => [
        Number(result.dataValues.timestamp),
        Number(result.dataValues.hora),
        Number(result.dataValues.minuto),
        Number(result.dataValues.direccion),
        Number(result.dataValues.humedad),
        Number(result.dataValues.lluvia),
        Number(result.dataValues.luz),
        Number(result.dataValues.presion),
        Number(result.dataValues.temperatura),
        Number(result.dataValues.velocidad),
    ]));
    // Normaliza los datos
    const xsMax = xs.max();
    const xsMin = xs.min();
    const ysMax = ys.max();
    const ysMin = ys.min();
    const normalizedXS = xs.sub(xsMin).div(xsMax.sub(xsMin));
    const normalizedYS = ys.sub(ysMin).div(ysMax.sub(ysMin));
    // Entrena el modelo
    return model.fit(normalizedXS, normalizedYS, {
        epochs: 100,
        callbacks: {
            onEpochEnd: (epoch, log) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(`Epoch ${epoch}: log: ${log.loss}`);
            }),
        },
    });
})
    .then((info) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Training Complete", info);
    // Guarda el modelo
    yield model.save("file://./");
}))
    .catch((err) => {
    console.error(err);
});
