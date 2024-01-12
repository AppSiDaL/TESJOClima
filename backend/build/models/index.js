"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    .catch((error) => {
    console.error("An error occurred while synchronizing the models:", error);
});
module.exports = {
    Weather,
    Prediction
};
