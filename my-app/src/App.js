import React, { useState } from 'react';
import axios from 'axios';



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
          console.log(response.data.output);

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
            <div>
                <h2>Output</h2>
                <textarea value={output} readOnly />
            </div>
            <button onClick={handleInsert}>Insert in DB</button>
        </div>
    );
}

export default App;
