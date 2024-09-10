// console.log("Hello from express!");
const express = require("express");

const app = express();
app.get("/", (require, responce) => {
  responce.send("This is new homepage!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
