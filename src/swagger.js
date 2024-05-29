// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Swagger definitions
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dopameme API",
      version: "1.0.0",
      description: "Documentation for Dopameme API",
    },
    servers: [
      {
        url: "http://localhost:3000", // Your server URL
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
