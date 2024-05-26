const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.post('/generate', async (req, res) => {
    const { tone, length, features, brandPositioning } = req.body;
    if(!tone || !length || !features || !brandPositioning) res.status(400).send('Invalid inputs');
    //const promptTemplate = `Generate a ${length.toLowerCase()} marketing copy in a ${tone.toLowerCase()} tone for a building with the following features: ${features}. The brand positioning is: ${brandPositioning}.`;
    const promptTemplate = `
You are a copywriter at a marketing agency working on a brochure for a real estate developer.
Generate a narrative flow for the real estate brochure keeping in mind the brand positioning and features of the property.

<BRAND POSITIONING>
${brandPositioning}
</BRAND POSITIONING> 

<FEATURES>
${features}
</FEATURES>

Keep the tone of the narrative ${tone}
Also make sure that the length of the copy is ${length === 'Short' ? '4-6 sentences' : length === 'Medium' ? '8-10 sentences' : '15-20 sentences'}
`;

    try {
        const response = await axios.post(
            'https://api.edenai.run/v2/text/generation',
            {
                providers: ["openai/gpt-3.5-turbo-instruct"],
                text: promptTemplate,
                length: length === 'Short' ? '4-6 sentences' : length === 'Medium' ? '8-10 sentences' : '15-20 sentences',
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.EDEN_AI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(response.data);
        const generatedText = response.data["openai/gpt-3.5-turbo-instruct"].generated_text;

        res.status(200).json({ output: generatedText });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating text');
    }
});

app.post('/insert', async (req, res) => {
    const { tone, length, features, brandPositioning, output } = req.body;
    console.log(req.body);

    try {
        const { data, error } = await supabase
            .from('your_table_name') // replace with your table name
            .insert([
                { positioning: brandPositioning, features: features, tone: tone, length: length, output: output }
            ]);

        if (error) throw error;
        res.status(200).send('Data inserted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error inserting data');
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
