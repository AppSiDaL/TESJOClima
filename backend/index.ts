const app = require('./app') // the actual Express application
const config = require("./utils/config")
const { connectToDatabase } = require("./utils/db");

const start = async () => {
  await connectToDatabase();
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${3000}`);
  });
};

start();