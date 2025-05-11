// src/services/ollamaClient.js
import axios from 'axios';

// Read base URL from env var
const baseURL = process.env.REACT_APP_OLLAMA_BASE_URL;
if (!baseURL) {
  throw new Error(
    'REACT_APP_OLLAMA_BASE_URL is not defined. Did you set it in .env.local?'
  );
}

// Create an Axios instance pointing at your ngrok tunnel
export const ollamaClient = axios.create({
  baseURL,
  timeout: 10000,
});

// Helper to invoke the chat API
export async function invokeChat(prompt, options = {}) {
  const body = {
    model: 'llama2',
    prompt,
    temperature: options.temperature ?? 0.3,
    // you can add other options here if needed
  };

  const res = await ollamaClient.post('/v1/chat', body);
  // Ollama’s response shape might be { content: "...", ... }
  return res.data;
}

