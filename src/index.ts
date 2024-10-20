import { app, BrowserWindow, ipcMain } from 'electron';
// import {TasksManager} from "./utils/TasksManager";
import {DatabaseTask} from "./utils/DatabaseTask.js";
import * as path from "node:path";

let mainWindow: BrowserWindow | null;
let databaseTask: DatabaseTask;

function createWindow() {
  mainWindow = new BrowserWindow({
    resizable: true,
    width: 400,
    height: 700,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    transparent: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.resolve('./build/preload/preload.cjs'),
    }
  });

  mainWindow.loadFile('./copy/index.html')
    .then(() => {});

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  databaseTask = new DatabaseTask(app)
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle('get-tasks', () => {
  return databaseTask.getTasks();
});

ipcMain.handle('update-task-done-status', (_event, id: number, done: boolean) => {
  databaseTask.updateTaskDoneStatus(id, done);
  return;
});