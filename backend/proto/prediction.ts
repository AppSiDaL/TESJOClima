import * as tf from '@tensorflow/tfjs-node';

async function predict() {
  // Cargar el modelo.
  const model = await tf.loadLayersModel('file://my-model/model.json');

  // Crear un tensor de entrada para la predicción.
  // Asegúrate de que estos valores están en el formato correcto y normalizados de la misma manera que los datos de entrenamiento.
  const input = tf.tensor2d([[
    Number('timestamp'),
    Number('hora'),
    Number('minuto'),
    Number('direccion'),
    Number('humedad'),
    Number('lluvia'),
    Number('luz'),
    Number('presion'),
    Number('temperatura'),
    Number('velocidad'),
  ]]);

  // Hacer una predicción con el modelo.
  const output = model.predict(input) as tf.Tensor;

  // Imprimir la predicción.
  output.print();
}

predict();