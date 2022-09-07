const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));


app.use("/api/notes", require("./routes/noteRoutes"));

app.listen(PORT, () =>
  console.log(`Server running on ${PORT}!`)
);