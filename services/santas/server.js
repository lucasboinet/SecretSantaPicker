const express = require('express');
const app = express();
const SantaPicker = require('./models/SantaPicker');

app.use(express.json());

app.post('/', (req, res) => {
    const { rules, users } = req.body;
    const santaPicker = new SantaPicker(rules, users);
    try {
        const draw = santaPicker.pickUsers();
        res.status(200).json({success: true, results: draw})
    } catch(err) {
        res.status(200).json({success: false, message: err.message})
    }
})

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})