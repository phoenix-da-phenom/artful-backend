require("dotenv").config();
const express = require('express');
const cors = require("cors");
const path = require("path");
const fs = require();


const Port = 8000

const app = express()

app.use(express.json())




app.listen(Port, () => {
    console.log(`Server is running on ${Port}`)
})