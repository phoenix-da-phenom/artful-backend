require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db");
const fs = require("fs"); // optional – only if you need it

const PORT = 8000;

const app = express();

app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});