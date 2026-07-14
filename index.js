const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/generate', async (req, res) => {
    try {
        if (!process.env.API_KEY) {
            throw new Error("API Key missing on server");
        }
        
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        // Yahan model ka naam update kar diya hai
        const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
        
        const prompt = req.body.prompt;
        if (!prompt) {
            throw new Error("No prompt provided");
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ text: response.text() });
    } catch (error) {
        console.error("DEBUG ERROR:", error.message);
        res.status(500).json({ text: "Error: " + error.message });
    }
});

module.exports = app;
