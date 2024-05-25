const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/generate', (req, res) => {
    const { tone, length, features, brandPositioning } = req.body;
    // Generate text based on the inputs
    const output = `Generated text based on: ${tone}, ${length}, ${features}, ${brandPositioning}`;
    res.json({ output });
});

app.post('/api/insert', (req, res) => {
    const { output } = req.body;
    // Insert the output into the database
    console.log('Inserted into DB:', output);
    res.sendStatus(200);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
