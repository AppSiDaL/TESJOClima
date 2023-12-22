import * as tf from "@tensorflow/tfjs-node";
import { SQLTesjoResponse } from "../types";
const { Weather } = require("../models");

async function predict() {
  // Cargar el modelo.
  const model = await tf.loadLayersModel("file://.//model.json");
  const results: SQLTesjoResponse[] = await Weather.findAll({
    limit: 1,
    order: [["timestamp", "DESC"]],
  });

  if (results.length === 0) {
    console.error("No hay datos disponibles para hacer predicciones.");
    return;
  }

  // Obtener datos de entrada y normalizarlos
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
  const output:any = model.predict(normalizedInput) as tf.Tensor;

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
}

predict();
