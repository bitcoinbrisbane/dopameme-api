// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Swagger definitions
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "A description of your API",
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
