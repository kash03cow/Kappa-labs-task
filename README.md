# Real Estate Marketing Copy Generator

This project is a web application that helps generate marketing copy for real estate brochures using a language model API. Users can input various details about a property and get a generated narrative flow, which can be further modified and saved to a database.

## Features

- Generate marketing copy based on input features, brand positioning, tone, and length.
- Allow users to highlight portions of the generated copy and modify them to be longer or shorter.
- Save the generated and modified copies to a Supabase database.

## Technologies Used

- Frontend: React, Material-UI
- Backend: Node.js, Express
- Database: Supabase
- Language Model API: Eden AI (OpenAI model)

## Getting Started

### Prerequisites

- Node.js and npm installed
- Supabase account and project set up
- Eden AI account and API key

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/real-estate-marketing-copy-generator.git
    cd real-estate-marketing-copy-generator
    ```

2. Set up the backend:
    ```bash
    cd backend
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the `backend` directory with the following content:
    ```plaintext
    EDEN_AI_API_KEY=your_eden_ai_api_key
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key
    ```

4. Set up the frontend:
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1. Start the backend server:
    ```bash
    cd backend
    node server.js
    ```

2. Start the frontend development server:
    ```bash
    cd ../frontend
    npm start
    ```

### Usage

1. Open your browser and go to `http://localhost:3000`.
2. Fill in the input fields for brand positioning, features, tone, and length.
3. Click the "Generate" button to get the marketing copy.
4. To modify a portion of the generated text, highlight the text, select "Make it longer" or "Make it shorter" from the dropdown, and click the "Modify" button.
5. To save the generated or modified copy to the database, click the "Insert in DB" button.

### Database Schema

The Supabase table should have the following schema:

| Column Name   | Data Type | Description                       |
| ------------- | --------- | --------------------------------- |
| Positioning   | text      | Input A: Brand Positioning        |
| Features      | text      | Input B: Features                 |
| Tone          | varchar   | Input C: Tone                     |
| Length        | varchar   | Input D: Length                   |
| Output        | text      | LLM Generated Output              |

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License.

### Acknowledgements

- [Material-UI](https://mui.com/) for the frontend components.
- [Eden AI](https://www.edenai.co/) for the language model API.
- [Supabase](https://supabase.com/) for the database.

