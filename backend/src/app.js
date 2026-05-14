const express = require("express");
const cookieParser = require("cookie-parser"); 
const dotenv = require("dotenv");
dotenv.config();

const { handle404Error, handleGlobalError, } = require("./middlewares");
const { v1Routes } = require("./routes/v1");
const { cors } = require("./config");
const path = require("path");
const app = express();

app.use(cors)
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API Status</title>
        <style>
          body {
            font-family: Arial;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #0f172a;
            color: white;
          }
          .box {
            text-align: center;
            padding: 30px;
            border: 2px solid #22c55e;
            border-radius: 12px;
          }
          h1 {
            color: #22c55e;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>🟢 LIVE</h1>
          <p>School Management API is running</p>
          <p>Backend is healthy 🚀</p>
        </div>
      </body>
    </html>
  `);
});

app.use("/api/v1", v1Routes);

app.use(handle404Error);
app.use(handleGlobalError);

module.exports = { app };
