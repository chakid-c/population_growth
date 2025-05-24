const express = require('express');
const cors = require('cors');
const app = express();
const csv = require('csvtojson');

app.use(cors());

const port = 8000;

app.listen(port, () => {
    console.log('Server running on port 8000');
});

app.get('/api/population', async (req, res) => {
    try {
        const jsonArray = await csv().fromFile('../data/population-and-demography.csv');
        res.json(jsonArray);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Catch-all route (สำหรับทุก route ที่ไม่ match ด้านบน)
app.use((req, res) => {
    res.redirect('https://population-growth-henna.vercel.app');
});