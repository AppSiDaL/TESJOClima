import { TesjoValues } from "../types";

const tf = require("@tensorflow/tfjs");
const {Weather} = require("../models");

// Crear un modelo secuencial.
const model = tf.sequential();

// Añadir una capa densa (fully connected) al modelo.
model.add(
  tf.layers.dense({ units: 100, activation: "relu", inputShape: [10] })
);
model.add(tf.layers.dense({ units: 1 }));

// Compilar el modelo.
model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

// Hacer una consulta a la base de datos.
Weather.findAll({}).then((results: any) => {
  // Convertir los resultados en tensores.
  const xs = tf.tensor2d(
    results.map((result: TesjoValues) => [
      result.timestamp,
      result.fecha,
      result.hora,
      result.minuto,
      result.direccion,
      result.humedad,
      result.lluvia,
      result.luz,
      result.presion,
      result.temperatura,
      result.velocidad,
    ])
  );
  const ys = tf.tensor2d(results.map((result: any) => [result.target]));

  // Entrenar el modelo.
  model.fit(xs, ys, {
    epochs: 100,
    callbacks: {
      onEpochEnd: async (epoch: any, log: any) => {
        console.log(`Epoch ${epoch}: loss = ${log.loss}`);
      },
    },
  });
});
