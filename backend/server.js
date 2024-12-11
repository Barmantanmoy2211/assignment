require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js")

connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

//Routes
app.use("/", (req, res) => {
    res.send("Hello World")
});

app.listen(PORT, () => {
    console.log(`Server listen at ${PORT}`)
})