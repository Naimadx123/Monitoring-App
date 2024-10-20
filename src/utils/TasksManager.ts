import {DatabaseTask} from "./DatabaseTask.js"
import {Task} from '../classes/Task.js';

export class TasksManager{
  tasks: Array<Task> = [];
  db: DatabaseTask;

  constructor(db: DatabaseTask) {
    this.db = db;
    this.tasks = db.getTasks();
  }

  getTasks(): Array<Task> {
    return this.tasks;
  }
}