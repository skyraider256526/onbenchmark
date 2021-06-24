const swaggerJSDoc = require("swagger-jsdoc");
const express = require("express");
const app = express();

const { BASEURLFORSWAGGER } = require("./config/baseUrl");

const swaggerDefinition = {
  info: {
    swagger: "2.0",
    title: "OnBenchMark",
    description: "OnBenchMark APIs",
  },
  host: `${BASEURLFORSWAGGER}`,
  basePath: "/api",
  //TODO: Add security properties
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "jwt",
      in: "header",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
};
const options = {
  swaggerDefinition,
  apis: ["./routes/apiDocumentation/*.js"],
};

module.exports.swaggerSpec = swaggerJSDoc(options);

//FIXME: No idea what this does
app.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
