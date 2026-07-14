const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Yahan check karein ke API_KEY mil rahi hai
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/generate', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // "gemini-pro" ki jagah "gemini-1.5-flash" use karein
        const prompt = req.body.prompt;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ text: response.text() });
    } catch (error) {
        console.error("Error Details:", error);
        res.status(500).json({ error: error.message });
    }
});

// Vercel ke liye module.exports zaroori hai
module.exports = app;
