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
function predict() {
    return __awaiter(this, void 0, void 0, function* () {
        // Cargar el modelo.
        const model = yield tf.loadLayersModel("file://.//model.json");
        const results = yield Weather.findAll({
            limit: 1,
            order: [["timestamp", "DESC"]],
        });
        if (results.length === 0) {
            console.error("No hay datos disponibles para hacer predicciones.");
            return;
        }
        const inputData = [
            Number(results[0].dataValues.timestamp),
            Number(results[0].dataValues.hora),
            Number(results[0].dataValues.minuto),
            Number(results[0].dataValues.direccion),
            Number(results[0].dataValues.humedad),
            Number(results[0].dataValues.lluvia),
            Number(results[0].dataValues.luz),
            Number(results[0].dataValues.presion),
            Number(results[0].dataValues.temperatura),
            Number(results[0].dataValues.velocidad),
        ];
        // Normalizar los datos de entrada directamente
        const normalizedInput = tf.tensor2d([inputData]).div(1000); // Ajusta este valor según sea necesario
        // Hacer la predicción
        const output = model.predict(normalizedInput);
        // Desnormalizar los resultados (ajusta según tu proceso de entrenamiento)
        const outputData = output
            .mul(1000) // Ajusta este valor según sea necesario
            .arraySync()[0];
        // Imprimir los resultados desnormalizados
        console.log(`Timestamp: ${outputData[0]}`);
        console.log(`Hora: ${outputData[1]}`);
        console.log(`Minuto: ${outputData[2]}`);
        console.log(`Dirección: ${outputData[3]}`);
        console.log(`Humedad: ${outputData[4]}`);
        console.log(`Lluvia: ${outputData[5]}`);
        console.log(`Luz: ${outputData[6]}`);
        console.log(`Presión: ${outputData[7]}`);
        console.log(`Temperatura: ${outputData[8]}`);
        console.log(`Velocidad: ${outputData[9]}`);
    });
}
predict();
