const express = require('express');
const Port = 8000

const app = express()

app.use(express.json())




app.listen(Port, () => {
    console.log(`Server is running on ${Port}`)
})