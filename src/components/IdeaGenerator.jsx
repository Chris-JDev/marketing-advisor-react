import React, { useState } from 'react';
import { generateIdeas } from '../services/ollamaService';

export default function IdeaGenerator({ category, addMessage }) {
  const [loading, setLoading] = useState(false);

  const go = async () => {
    setLoading(true);
    try {
      const content = await generateIdeas(category);
      addMessage({ role: 'assistant', content });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={go} disabled={loading} className="idea-button">
      {loading ? 'Generating…' : 'Quick Idea Generator'}
    </button>
  );
}

