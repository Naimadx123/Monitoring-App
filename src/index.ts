import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import {DatabaseTask} from "./utils/DatabaseTask.js";
import * as path from "node:path";

let mainWindow: BrowserWindow | null;
let databaseTask: DatabaseTask;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      preload: path.join(__dirname, 'preload', 'preload.cjs'),
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'copy', 'index.html'))
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