// Starta o server puxando as config do app.js e do .env
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Serving running on port ${PORT}`));
