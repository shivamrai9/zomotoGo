const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const connectToMongoDB = require("./db");


app.use(cors());

connectToMongoDB();
app.use(express.json())

app.use('/api/', require("./Routes/CreateUser"))
app.use('/api/', require("./Routes/displaydata"))

app.get('/', (req, res) => {
  res.send('Hello World! -----------')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})