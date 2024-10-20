import { contextBridge, ipcRenderer } from 'electron';
import { Task } from '../classes/Task';

contextBridge.exposeInMainWorld('electronAPI', {
  getTasks: async (): Promise<Task[]> => {
    return await ipcRenderer.invoke('get-tasks');
  },
  updateTaskDoneStatus: async (id: number, done: boolean): Promise<void> => {
    await ipcRenderer.invoke('update-task-done-status', id, done);
  },
});
