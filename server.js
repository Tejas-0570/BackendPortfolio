const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contact');
require('dotenv').config();  // must be the FIRST thing

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});


