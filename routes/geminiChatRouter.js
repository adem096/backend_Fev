const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Import node-fetch to polyfill fetch and Headers API
const fetch = require('node-fetch');
const { Headers } = require('node-fetch');
global.fetch = fetch;
global.Headers = Headers;

// Debug: Log if API key exists (without showing the actual key)
console.log('API Key exists:', !!process.env.GEMINI_API_KEY);

// Initialize Gemini configuration with a specific model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Chat endpoint
router.post('/api/gemini-chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      console.error('Gemini API key is not set in environment variables');
      return res.status(500).json({ error: 'Server configuration error: API key missing' });
    }

    console.log('Attempting to send message to Gemini:', message);

    const result = await model.generateContent(message);
    const response = result.response.text();

    console.log('Successfully received response from Gemini');
    res.json({ response });

  } catch (error) {
    console.error('Detailed error in Gemini chat endpoint:', {
      message: error.message,
      stack: error.stack,
      // Note: Gemini API errors might not have a 'response' property like some other APIs
    });
    res.status(500).json({ 
      error: 'Failed to process your request',
      details: error.message 
    });
  }
});

module.exports = router; 