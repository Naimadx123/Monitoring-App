import Database from 'better-sqlite3';
import * as path from 'node:path';
import { Task } from '../classes/Task.js';
import random_sentences from '../../random_sentences.json' with { type: "json" };

interface TaskRow {
  id: number;
  title: string;
  description: string;
  priority: number;
  done: number;
}

export class DatabaseTask {
  app: Electron.App;
  db: Database.Database;

  constructor(app: Electron.App) {
    this.app = app;
    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'focus.sqlite');
    this.db = new Database(dbPath);

    this._prepare();
  }

  getDatabase(): Database.Database {
    return this.db;
  }

  _prepare() {
    this.db.prepare(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      priority INTEGER,
      done INTEGER
    )
  `).run();

    interface CountRow {
      count: number;
    }
    const row = this.db.prepare('SELECT COUNT(*) as count FROM tasks').get() as CountRow;

    if (row.count === 0) {
      let randomSentence = random_sentences[Math.floor(Math.random()*random_sentences.length)];
      this.db.prepare(`
      INSERT INTO tasks (title, description, priority, done)
      VALUES (?, ?, ?, ?)
    `).run(randomSentence, 'This is your first task', 1, 0);
    }
  }


  getTasks(): Task[] {
    const stmt = this.db.prepare('SELECT * FROM tasks');
    const rows = stmt.all() as TaskRow[];

    const tasks = rows.map((row) => {
      // Now 'row' is of type 'TaskRow'
      return new Task(
        row.id,
        row.title,
        row.description,
        row.priority,
        Boolean(row.done)
      );
    });

    return tasks;
  }

  updateTaskDoneStatus(id: number, done: boolean){
    this.db.prepare("UPDATE tasks SET done = ? WHERE id = ?").run(Number(done), id)
  }

}
