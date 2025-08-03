const mysql = require('mysql');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Function to test DB connection
function testConnection() {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        console.error("❌ Error connecting to DB:", err.message);
        return reject(err);
      } else {
        console.log("✅ Database connected successfully.");

        // Read and execute SQL schema
        const initSql = fs.readFileSync(path.join(__dirname, './init.sql'), 'utf8');

        const statements = initSql
          .split(';')
          .map(stmt => stmt.trim())
          .filter(stmt => stmt.length > 0);

        let index = 0;
        function executeNext() {
          if (index < statements.length) {
            db.query(statements[index], (err) => {
              if (err) {
                console.error(`❌ Error in SQL ${index + 1}:`, err.sqlMessage);
                reject(err);
              } else {
                console.log(`✅ SQL ${index + 1} executed`);
                index++;
                executeNext();
              }
            });
          } else {
            resolve();
          }
        }

        executeNext();
      }
    });
  });
}

module.exports = { db, testConnection };
