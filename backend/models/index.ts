const Weather = require("./weather");
const Prediction = require("./prediction");
const { sequelize } = require("../utils/db");

sequelize
  .sync()
  .then(() => {
    Weather.sync();
    Prediction.sync();
    console.log("All models were synchronized successfully.");
  })
  .catch((error: Error) => {
    console.error("An error occurred while synchronizing the models:", error);
  });
export {};

module.exports = {
  Weather,
  Prediction
};
