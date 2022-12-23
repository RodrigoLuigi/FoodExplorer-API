const migrationsRun = require('./database/sqlite/migrations');

const routes = require('./routes');
const express = require('express');

migrationsRun();

const app = express();
app.use(express.json());

app.use(routes);

const PORT = 3333;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT} 🚀`)
);
