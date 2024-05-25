import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [tone, setTone] = useState('Casual');
    const [length, setLength] = useState('Short');
    const [features, setFeatures] = useState('');
    const [brandPositioning, setBrandPositioning] = useState('');
    const [output, setOutput] = useState('');

    const handleGenerate = async () => {
        const response = await axios.post('/api/generate', {
            tone,
            length,
            features,
            brandPositioning
        });
        setOutput(response.data.output);
    };

    const handleInsert = async () => {
        await axios.post('/api/insert', {
            output
        });
        alert('Inserted into DB');
    };

    return (
        <div className="App">
            <h1>Reference Front End</h1>
            <div>
                <label>Brand Positioning</label>
                <input 
                    type="text" 
                    value={brandPositioning}
                    onChange={(e) => setBrandPositioning(e.target.value)}
                />
            </div>
            <div>
                <label>Features</label>
                <input 
                    type="text" 
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                />
            </div>
            <div>
                <label>Tone</label>
                <select 
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                >
                    <option value="Casual">Casual</option>
                    <option value="Formal">Formal</option>
                    <option value="Grandiose">Grandiose</option>
                </select>
            </div>
            <div>
                <label>Length</label>
                <select 
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                >
                    <option value="Short">Short</option>
                    <option value="Medium">Medium</option>
                    <option value="Long">Long</option>
                </select>
            </div>
            <button onClick={handleGenerate}>Generate</button>
            <button onClick={handleInsert}>Insert in DB</button>
            <div>
                <h2>Output</h2>
                <textarea value={output} readOnly />
            </div>
        </div>
    );
}

export default App;
