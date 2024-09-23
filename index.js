const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connectionURL = "mongodb://localhost:27017/schoolDB";
mongoose
  .connect(connectionURL)
  .then(() => console.log("Database connection successful!"))
  .catch((error) => console.log(error.message));

// add student from request body

// finds student from request query

// update student from request query

// delete student with email

const errorMiddleware = (error, request, response, next) => {
  response.status(500).send(error, message);
  next(error.message);
};

app.use(errorMiddleware);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
