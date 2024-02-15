const express = require("express")
const cors = require("cors")
const { createServer } = require("http")
const socketSetup = require("./socket"); 
require("dotenv").config()

const app = express()

const server = createServer(app)

app.use(express.json())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("Hello this is test message")
})

const port = process.env.PORT || 5000

server.listen(port, () => {                                                                                         
    console.log(`Server run on port http://localhost:${port}`)
})

socketSetup(server)