import dotenv from "dotenv";

// Load environmental variables located in the .env file
dotenv.config();

const { server, db } = {
  server: {
    port: parseInt(process.env.PORT) || 5001,
    env: process.env.NODE_ENV || "development",
    secret: process.env.SECRET,
    issuer: process.env.TOKEN_ISSUER,
    services: {
      auth: {
        url: process.env.AUTH_SERVICE_URL
      }
    }
  },
  db: {
    connection: process.env.DB_CONNECTION,
    config: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  }
};

export { server, db };
