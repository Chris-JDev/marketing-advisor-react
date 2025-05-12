import axios from 'axios';

const BASE = process.env.REACT_APP_OLLAMA_BASE_URL;

// simple ping to test connection
export async function pingOllama() {
  const res = await axios.get(`${BASE}/ping`);
  return res.data;
}

// send a chat message
export async function sendChat(messages) {
  const payload = {
    model: 'llama2',
    messages,
    temperature: 0.3,
  };
  const res = await axios.post(`${BASE}/v1/chat/completions`, payload);
  return res.data.choices[0].message;
}

// generate quick marketing ideas
export async function generateIdeas(category) {
  const prompt = `List 5 quick marketing ideas for ${category}. For each: headline + 1-sentence explanation.`;
  const answer = await sendChat([{ role: 'user', content: prompt }]);
  return answer.content;
}

