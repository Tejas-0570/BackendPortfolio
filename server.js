const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contact');
require('dotenv').config(); // must be the FIRST thing

const app = express();

// ✅ CORS should be configured before routes
app.use(cors({
    origin: 'https://frontend-portfolio-three-pi.vercel.app',  // no trailing slash
}));

app.use(express.json());

// ✅ Routes after CORS setup
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
