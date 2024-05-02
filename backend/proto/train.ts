/* import * as tf from "@tensorflow/tfjs-node";
const { Weather } = require("../models");

// Define el modelo
const model = tf.sequential();
model.add(tf.layers.dense({ units: 64, activation: "relu", inputShape: [10] }));
model.add(tf.layers.dense({ units: 10, activation: "linear" }));

// Compila el modelo
model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

// Carga los datos
Weather.findAll({})
  .then((results: any) => {
    const xs = tf.tensor2d(
      results.map((result: any) => [
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
      ])
    );
    const ys = tf.tensor2d(
      results.map((result: any) => [
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
      ])
    );

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
        onEpochEnd: async (epoch: any, log: any) => {
          console.log(`Epoch ${epoch}: log: ${log.loss}`);
        },
      },
    });
  })
  .then(async (info: any) => {
    console.log("Training Complete", info);
    // Guarda el modelo
    await model.save("file://./");
  })
  .catch((err: any) => {
    console.error(err);
  });
 */