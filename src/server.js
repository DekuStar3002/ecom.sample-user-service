require('dotenv').config();
const express = require('express');
const routes = require('./routes');


const app = express();

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server is runnning on PORT ${PORT}`);
});