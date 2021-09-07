const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./src/modules/routes/routes');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://user:user@cluster0.aqy7s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.use('/', apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
