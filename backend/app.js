const express = require("express")
const cors = require("cors")
const { createServer } = require("http")
const socketSetup = require("./socket"); 
require("dotenv").config()
const http = require('http');


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

app.get("/ping", (req, res) => {
    res.send("pong");
    return;
});

const port = process.env.PORT || 5000


function pingServer() {
    const options = {
      hostname: 'localhost',
      port: process.env.PORT || 5000,
      path: '/ping',
      method: 'GET'
    };
  
    const req = http.request(options, (res) => {
      res.on('data', (chunk) => {
        // console.log(`Ping response: ${chunk}`);
        console.log("Calling dummy api")
      });
    });
  
    req.on('error', (e) => {
      console.error(`Problem with ping request: ${e}`);
    });
  
    req.end();
  }
  
  setInterval(pingServer, 1000); 
  

server.listen(port, () => {                                                                                         
    console.log(`Server run on port http://localhost:${port}`)
})

socketSetup(server)