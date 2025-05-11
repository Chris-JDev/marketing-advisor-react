import React from 'react';
import { AppProvider } from './contexts/AppContext';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import TaskManager from './components/TaskManager';

function App() {
  return (
    <AppProvider>
      <div className="app-container flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <ChatWindow />
          <TaskManager />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
