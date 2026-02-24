import "dotenv/config"
import express from "express"
import cors  from "cors"
import path from "path"
import connectDB from "./src/Config/db"

import  fs from "fs"
import authRoute from "./src/Routes/authRoute"
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();


//Routes here//
app.use('/api/v1/auth', authRoute)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});