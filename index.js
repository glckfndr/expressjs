// console.log("Hello from express!");
const express = require("express");
const cookieParser = require("cookie-parser");
const log = require("./util/log");

const app = express();
app.use(cookieParser());
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

app.use(express.json());

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

  response.send("This is get method for example!");
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
