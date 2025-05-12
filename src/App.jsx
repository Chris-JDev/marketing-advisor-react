import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import IdeaGenerator from './components/IdeaGenerator';
import { sendChat, pingOllama } from './services/ollamaService';

export default function App() {
  const [category, setCategory] = useState(
    localStorage.getItem('category') || 'Digital Marketing'
  );
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem('messages') || '[]')
  );

  // persist messages
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  // persist category
  useEffect(() => {
    localStorage.setItem('category', category);
  }, [category]);

  // test Ollama connection
  useEffect(() => {
    pingOllama().catch(() => alert('Failed to reach Ollama. Is ngrok running?'));
  }, []);

  const addMessage = (msg) => setMessages((prev) => [...prev, msg]);

  const handleSend = async (text) => {
    const userMsg = { role: 'user', content: text };
    addMessage(userMsg);
    const resp = await sendChat([...messages, userMsg]);
    addMessage({ role: 'assistant', content: resp.content });
  };

  return (
    <div className="app-container">
      <Sidebar selected={category} onSelect={setCategory} />
      <main>
        <div className="top-bar">
          <IdeaGenerator category={category} addMessage={addMessage} />
        </div>
        <ChatWindow messages={messages} onSend={handleSend} />
      </main>
    </div>
  );
}

