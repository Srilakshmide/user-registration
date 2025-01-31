const Hapi = require("@hapi/hapi");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { config } = require("./config/config");

require("dotenv").config();

const init = async () => {
  await connectDB();

  const server = Hapi.server({
    port: config.SERVER_CONFIG.LISTEN_PORT,
    host: config.SERVER_CONFIG.LISTEN_HOST,
    routes: {
      cors: {
        origin: ['*'], // Allow all origins
        additionalHeaders: ['backend']
      },
    }
  });

  server.route(authRoutes);

  await server.start();
  console.log("Server running on", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
