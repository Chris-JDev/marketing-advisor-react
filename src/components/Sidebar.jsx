import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { invokeChat } from '../services/ollamaClient';

const MARKETING_CATEGORIES = [
  "Digital Marketing", "Content Marketing", "Social Media Marketing",
  "Email Marketing", "SEO & SEM", "Influencer Marketing",
  "Brand Development", "Market Research"
];

export default function Sidebar() {
  const { category, setCategory, addMessage } = useContext(AppContext);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => setFiles(Array.from(e.target.files));

  const handleCreateKB = () => {
    // TODO: implement vectorService to process files
    addMessage({ role: 'assistant', content: 'Knowledge base created.' });
  };

  const handleQuickIdeas = async () => {
    const prompt = `Generate 5 quick marketing ideas for ${category}.`;
    const res = await invokeChat(prompt);
    addMessage({ role: 'assistant', content: res.content || JSON.stringify(res) });
  };

  return (
    <aside className="w-64 p-4 bg-gray-100 flex-shrink-0">
      <h2 className="text-xl font-bold mb-4">Marketing Advisor</h2>
      <div className="mb-4">
        <label className="block font-medium">Focus area</label>
        <select
          className="w-full border rounded p-1"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {MARKETING_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div className="mb-4">
        <h3 className="font-medium">Upload Resources</h3>
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          multiple
          onChange={handleFileChange}
          className="mt-2"
        />
        <button
          onClick={handleCreateKB}
          className="mt-2 w-full bg-blue-500 text-white py-1 rounded"
        >Create Knowledge Base</button>
      </div>
      <div className="mb-4">
        <h3 className="font-medium">Quick Idea Generator</n        <button
          onClick={handleQuickIdeas}
          className="mt-2 w-full bg-green-500 text-white py-1 rounded"
        >Generate Quick Ideas</button>
      </div>
    </aside>
  );
}
