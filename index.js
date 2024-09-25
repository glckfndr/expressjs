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
// add several students from request body
app.post("/student/multiple", async (request, response, next) => {
  try {
    await Student.insertMany(request.body);
    response.status(201).json({ message: "Students added successfully!" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// find student from request query

// update one student from request query
app.put("/student/single", async (request, response, next) => {
  try {
    const { email } = request.query;
    const { department, age } = request.body;
    await Student.findOneAndUpdate({ email }, { department, age });
    response
      .status(200)
      .json({ message: `Student with email: ${email}  updated successfully!` });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// delete student with email

const errorMiddleware = (error, request, response, next) => {
  response.status(500).send(error, message);
  next(error.message);
};

app.use(errorMiddleware);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
