// console.log("Hello from express!");
const express = require("express");
const cookieParser = require("cookie-parser");
const log = require("./util/log");
const fs = require("fs");
const mongodb = require("mongodb");

const app = express();
app.use(express.json());

const connectionURL = "mongodb://localhost:27017";
const client = new mongodb.MongoClient(connectionURL);
const db = client.db("schoolDB");
const students = db.collection("students");
const first_student = {
  name: "Pavlo",
  email: "pavbul@gmail.com",
  age: 17,
  department: "CS",
};
// add student from request body
app.post("/students", (request, response, next) => {
  students
    .insertMany(request.body)
    .then(() => response.status(201).send(`Students added successfully!`))
    .catch((error) => response.status(500).send(error.message));
});

// add finds student from request query
app.get("/students", (request, response, next) => {
  const { age } = request.query;
  console.log(request.query);
  students
    .find({ age: parseInt(age) })
    .toArray()
    .then((data) => response.status(200).json(data))
    .catch((error) => response.status(500).send(error.message));
});

// update student from request query
app.put("/students", (request, response, next) => {
  const { email } = request.query;
  const { department, age } = request.body;

  students
    .findOneAndUpdate(
      { email },
      { $set: { department, age } },
      { returnDocument: "after" }
    )
    .then((data) => {
      console.log(data);
      response.status(200).json({
        message: "Student updated successfully",
        updatedStudent: data.value,
      });
    })
    .catch((error) => response.status(500).json({ message: error.message }));
});

// delete student with email
app.delete("/students", (request, response, next) => {
  const { email } = request.query;

  students
    .findOneAndDelete({ email: email })
    .then(() => {
      response.status(200).json({
        message: `Student with email: ${email} deleted successfully`,
      });
    })
    .catch((error) => response.status(500).json({ message: error.message }));
});

client
  .connect()
  .then(() => console.log("Mongodb connection successful!"))
  .catch((error) => console.log(error));

app.use(cookieParser());
app.set("view engine", "ejs");
const admin = express.Router();
const student = express.Router();

app.use("/admin", admin);
app.use("/student", student);

admin.get("/home", (request, response, next) => {
  log(request);
  response.send("Admin home route");
});

student.get("/home", (request, response, next) => {
  log(request);
  response.send("Student home route");
});

app.get("/home", (request, response) => {
  log(request);
  response.send("Common home route!");
});

app.get("/", (request, response) => {
  response.send("This is new homepage!");
});

app.get("/users", (request, response, next) => {
  response.send("List of users!");
});

app.get("/users/:id", (request, response, next) => {
  let { id } = request.params;
  console.log(id);
  let { name, email } = request.query;
  console.log(name, email);
  response.send(`User: ${id} details: ${name}, ${email}`);
});

app.get("/example", (request, response, next) => {
  let { email } = request.cookies;
  console.log(email);
  // response.cookie("name", "oleh");
  response.cookie("age", "26");
  response.clearCookie("name");
  console.log(request.hostname);
  console.log(request.ip);
  console.log(request.method);
  console.log(request.protocol);
  console.log(request.secure);
  console.log(request.accepts());
  console.log(request.get("Content-type"));
  // response.location("/xyz");
  response.set("title", "express-set");
  const title = response.get("title");
  console.log(title);
  // response.json({
  //   name: "oleh",
  //   email: "olbul@gmail.com",
  // });
  // response.send("This is get method for example!");
  // response.redirect("/test");
  response.format({
    "text/plain": () => {
      response.send("Plain text response");
    },
    "application/json": () => {
      response.json({ name: "oleh", email: "olbul@gmail.com" });
    },
    "text/html": () => {
      // response.render("pages/home.ejs");
      response.render("test.ejs", { name: "oleh", email: "olbul@gmail.com" });
    },
    default: () => {
      response.send("Nothing matched!");
    },
  });
});

/* 45 */
app.get("/example2", (request, response, next) => {
  // throw new Error("Test Example2 error");
  // console.log(xyz);
  // response.send("Example2 route!");
  fs.readFile("test.txt", (error, data) => {
    if (data) {
      request.send(data);
    } else if (error) {
      next(error);
    }
  });
});

const errorMiddleware = (error, request, response, next) => {
  // console.log(error.message);
  // response.send("Custom error handling in example2!");
  response.status(500).send(error, message);
  next(error.message);
};

app.use(errorMiddleware);

app.get("/test", (request, response) => {
  response.send("This is get for test!");
});

app.post("/example", (request, response, next) => {
  let { name, email } = request.body;
  console.log(name, email);
  response.send("This is post method with body!");
});

app.put("/example", (request, response, next) => {
  response.send("This is put method!");
});

app.patch("/example", (request, response, next) => {
  response.send("This is patch method!");
});

app.delete("/example", (request, response, next) => {
  response.send("This is delete method!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
