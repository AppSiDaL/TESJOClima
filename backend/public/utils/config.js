"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
module.exports = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 3001,
};
