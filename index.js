const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/generate', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(req.body.prompt);
        res.json({ text: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(process.env.PORT || 3000);
