// console.log("Hello from express!");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.send("This is new homepage!");
});

app.get("/users", (request, response, next) => {
  response.send("List of users!");
});

app.get("/users/:id", (request, response, next) => {
  let { id } = request.params;
  console.log(id);
  response.send(`User ${id} details`);
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
