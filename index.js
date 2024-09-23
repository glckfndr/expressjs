const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connectionURL = "mongodb://localhost:27017/schoolDB";
mongoose
  .connect(connectionURL)
  .then(() => console.log("Database connection successful!"))
  .catch((error) => console.log(error.message));

const studentSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  department: String,
  address: String,
});

const Student = mongoose.model("student", studentSchema);

// add student from request body
app.post("/student/single", async (request, response, next) => {
  try {
    const { name, email, age, department, address } = request.body;

    const newStudent = new Student({
      name,
      email,
      age,
      department,
      address,
    });

    await newStudent.save();
    response.status(201).json({ message: "Student added successfully!" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

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
