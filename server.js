const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const DEEPSEEK_API_KEY = "sk-0e9d37027edc440482a0c911d26dd5e8";
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"; // Example endpoint

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Proxy endpoint to DeepSeek API
app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;
    try {
        const response = await axios.post(
            DEEPSEEK_API_URL,
            {
                model: "deepseek-chat", // adjust to actual model if needed
                messages: messages,
            },
            {
                headers: {
                    "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
                    "Content-Type": "application/json",
                }
            }
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
