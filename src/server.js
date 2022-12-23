const migrationsRun = require('./database/sqlite/migrations');

const express = require('express');

migrationsRun();

const app = express();
app.use(express.json());

const PORT = 3333;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT} 🚀`)
);
