// src/components/ChatWindow.jsx
import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';
import { invokeChat } from '../services/ollamaClient';

export default function ChatWindow() {
  const { messages, addMessage, addTask } = useContext(AppContext);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add user message
    addMessage({ role: 'user', content: trimmed });
    setInput('');

    // Invoke LLM
    try {
      const res = await invokeChat(trimmed);
      const content = res.content ?? JSON.stringify(res);
      addMessage({ role: 'assistant', content });
    } catch (err) {
      console.error(err);
      addMessage({ role: 'assistant', content: 'Error retrieving response.' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleGenerateTasks = async () => {
    if (!messages.length) return;
    const conversation = messages.map(m => `${m.role}: ${m.content}`).join('\n');
    const prompt = `Extract actionable tasks from this conversation:\n${conversation}`;

    try {
      const res = await invokeChat(prompt, { temperature: 0.2 });
      const lines = (res.content || '').split('\n').filter(l => l.trim());
      lines.forEach(line => {
        // Strip bullet/numbering
        const task = line.replace(/^[\d\-\*\.\)\s]+/, '');
        if (task) addTask(task);
      });
    } catch (err) {
      console.error(err);
      addMessage({ role: 'assistant', content: 'Failed to extract tasks.' });
    }
  };

  return (
    <main className="flex-1 p-4 flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-2 rounded ${
                m.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'
              }`}
            >
              <strong>{m.role === 'user' ? 'You' : 'Bot'}:</strong> {m.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center space-x-2">
        <textarea
          className="flex-1 border rounded p-2 resize-none"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message and hit Enter to send"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
        <button
          onClick={handleGenerateTasks}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Extract Tasks
        </button>
      </div>
    </main>
);
}
