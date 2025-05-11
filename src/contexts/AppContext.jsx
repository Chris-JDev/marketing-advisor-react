import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('Digital Marketing');

  const addMessage = (msg) => setMessages(prev => [...prev, msg]);
  const addTask = (task) => setTasks(prev => [...prev, { task, completed: false }]);
  const toggleTask = (index) => {
    setTasks(prev =>
      prev.map((t, i) => i === index ? { ...t, completed: !t.completed } : t)
    );
  };
  const clearTasks = () => setTasks([]);

  return (
    <AppContext.Provider value={{
      messages,
      addMessage,
      tasks,
      addTask,
      toggleTask,
      clearTasks,
      category,
      setCategory,
    }}>
      {children}
    </AppContext.Provider>
  );
};
