const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const ErrorHandler = require('./utils/ErrorHandler');
const { dbconnect } = require('./db/dbconnect');
const router = require('./routes/routes');
const http = require('http');
const socketIo = require('socket.io');
dotenv.config({ path: "./config/.env" });
const server = http.createServer(app);


const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('A user connected with ID:', socket.id);
});


app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));
app.use("/api", router);

app.use((err, req, res, next) => {
  const error = new ErrorHandler(err.message || 'Something went wrong', err.statusCode || 500);
  res.status(error.statusCode).json({
    message: error.message,
  });
});

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server for handling unexpected exception`);
});

// Connect to database
dbconnect();

// Start server
const port = process.env.PORT || 5000;
server.listen(port, () => { // Use 'server' instead of 'app'
  console.log(`Server running on http://localhost:${port}`);
});


module.exports = { io };