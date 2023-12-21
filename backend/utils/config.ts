require("dotenv").config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  PORT: process.env.PORT || 3001,
};
