const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

// Create the Express app
const app = express();
const SERVER_PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Create a connection to the MySQL database
const mysqlConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

let con = null;
const databaseInit = () => {
  con = mysql.createConnection(mysqlConfig);
  con.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: ", err);
      return;
    }
    console.log("Connected to the database");
  });
};

const createDatabase = () => {
  con.query("CREATE DATABASE IF NOT EXISTS appdb", (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Database created successfully");
  });
};

const createTable = () => {
  con.query(
    "CREATE TABLE IF NOT EXISTS apptb (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))",
    (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Table created successfully");
    }
  );
};

//Express route definitions
app.get("/", (req, res) => {
  res.send("API server running...");
});

// GET request
app.get("/user", (req, res) => {
  databaseInit();
  con.query("SELECT * FROM apptb", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.json(results);
    }
  });
});

// POST request
app.post("/user", (req, res) => {
  con.query(
    "INSERT INTO apptb (name) VALUES (?)",
    [req.body.data],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      } else {
        res.json(results);
      }
    }
  );
});

app.post("/dbinit", (req, res) => {
  databaseInit();
  createDatabase();
  res.json("Database created successfully");
});

app.post("/tbinit", (req, res) => {
  databaseInit();
  createTable();
  res.json("Table created successfully");
});

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
