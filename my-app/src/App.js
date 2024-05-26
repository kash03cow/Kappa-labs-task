import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Select, MenuItem, Typography, Box, FormControl, InputLabel, Paper } from '@mui/material';
import './App.css';

function App() {
    const [tone, setTone] = useState('Casual');
    const [length, setLength] = useState('Short');
    const [features, setFeatures] = useState('');
    const [brandPositioning, setBrandPositioning] = useState('');
    const [output, setOutput] = useState('');

    const handleGenerate = async () => {
        try {
            const response = await axios.post('http://localhost:8000/generate', {
                tone,
                length,
                features,
                brandPositioning
            });
            setOutput(response.data.output);
        } catch (error) {
            console.error('Error generating text:', error);
        }
    };

    const handleInsert = async () => {
        try {
            await axios.post('http://localhost:8000/insert', {
                tone,
                length,
                features,
                brandPositioning,
                output
            });
            alert('Inserted into DB');
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h3" component="h1" gutterBottom>
            Marketing Brochure for a real estate 
            </Typography>
            <Paper elevation={3} style={{ padding: '16px' }}>
                <Box display="flex" flexDirection="column" gap="16px">
                    <TextField
                        label="Brand Positioning"
                        value={brandPositioning}
                        onChange={(e) => setBrandPositioning(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        label="Features"
                        value={features}
                        onChange={(e) => setFeatures(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="tone-label">Tone</InputLabel>
                        <Select
                            labelId="tone-label"
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            label="Tone"
                        >
                            <MenuItem value="Casual">Casual</MenuItem>
                            <MenuItem value="Formal">Formal</MenuItem>
                            <MenuItem value="Grandiose">Grandiose</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="length-label">Length</InputLabel>
                        <Select
                            labelId="length-label"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            label="Length"
                        >
                            <MenuItem value="Short">Short</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Long">Long</MenuItem>
                        </Select>
                    </FormControl>
                    <Box display="flex" justifyContent="space-between" gap="16px">
                        <Button variant="contained" color="primary" onClick={handleGenerate} fullWidth>
                            Generate
                        </Button>

                    </Box>
                    <Typography variant="h6" component="h2">
                        Output
                    </Typography>
                    <Paper style={{ padding: '16px', minHeight: '100px' }} variant="outlined">
                        <Typography>{output}</Typography>
                    </Paper>
                    <Box display="flex" justifyContent="space-between" gap="16px">
                        <Button variant="contained" color="secondary" onClick={handleInsert} fullWidth>
                            Insert in DB
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default App;
