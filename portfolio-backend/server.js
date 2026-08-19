//------ IMPORT PACKAGES -----

const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();


//------ CREATE EXPRESS APP -----

const app = express();


//------ MIDDLEWARE -----

app.use(
  cors({
    origin: "https://gauravkumar42.me",
  })
);

app.use(express.json());


//------ MYSQL CONNECTION -----

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


//------ TEST ROUTE -----

app.get("/", (req, res) => {
  res.json({
    message: "Portfolio API is running",
  });
});


//------ TEST DATABASE CONNECTION -----

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS result");

    res.json({
      success: true,
      message: "MySQL connection successful!",
      result: rows[0].result,
    });

  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      success: false,
      message: "MySQL connection failed.",
    });
  }
});


//------ CONTACT FORM API -----

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    await db.execute(
      "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message.",
    });
  }
});


//------ START SERVER -----

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Portfolio API running on port ${PORT}`);
});