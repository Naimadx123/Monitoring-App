import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { ipcRenderer } from 'electron';

ReactDOM.render(<App />, document.getElementById('root'));


document.getElementById('minimize')?.addEventListener('click', () => {
  ipcRenderer.send('window-control', 'minimize');
});

document.getElementById('maximize')?.addEventListener('click', () => {
  ipcRenderer.send('window-control', 'maximize');
});

document.getElementById('close')?.addEventListener('click', () => {
  ipcRenderer.send('window-control', 'close');
});

