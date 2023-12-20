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
const tf = require("@tensorflow/tfjs");
const Weather = require("../models/weather");
// Crear un modelo secuencial.
const model = tf.sequential();
// Añadir una capa densa (fully connected) al modelo.
model.add(tf.layers.dense({ units: 100, activation: "relu", inputShape: [10] }));
model.add(tf.layers.dense({ units: 1 }));
// Compilar el modelo.
model.compile({ loss: "meanSquaredError", optimizer: "sgd" });
// Hacer una consulta a la base de datos.
Weather.findAll({}).then((results) => {
    // Convertir los resultados en tensores.
    const xs = tf.tensor2d(results.map((result) => [
        result.feature1,
        result.feature2,
        // ...añadir todas las características aquí...
    ]));
    const ys = tf.tensor2d(results.map((result) => [result.target]));
    // Entrenar el modelo.
    model.fit(xs, ys, {
        epochs: 100,
        callbacks: {
            onEpochEnd: (epoch, log) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(`Epoch ${epoch}: loss = ${log.loss}`);
            }),
        },
    });
});
