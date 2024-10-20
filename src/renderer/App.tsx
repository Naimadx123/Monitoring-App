// src/renderer/App.tsx
import React, { useState, useEffect } from 'react';
import { TaskI, TaskPriority } from '../interfaces/TaskI';

declare global {
  interface Window {
    electronAPI: {
      getTasks: () => Promise<TaskI[]>;
      updateTaskDoneStatus: (id: number, done: boolean) => Promise<void>;
    };
  }
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskI[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await window.electronAPI.getTasks();
        console.log(fetchedTasks)
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const toggleTaskDone = async (id: number) => {
    const task = tasks.find(task => task.id === id);
    if (!task) return;

    try {
      await window.electronAPI.updateTaskDoneStatus(id, !task.done);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, done: !task.done } : task
        )
      );
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Tasks</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <h3>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTaskDone(task.id)}
                style={{ marginRight: '10px' }}
              />
              {task.title}
            </h3>
            <p>{task.description}</p>
            <p>Priority: {TaskPriority[task.priority]}</p>
            <p>Status: {task.done ? 'Completed' : 'Pending'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
