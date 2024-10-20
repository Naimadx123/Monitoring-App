import {TaskI, TaskPriority} from "../interfaces/TaskI";

export class Task implements TaskI{
  id: number;
  title: string
  description: string
  priority: TaskPriority
  done: boolean

  constructor(id: number, title: string, description: string, priority: TaskPriority, done?: boolean) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;

    if (typeof done !== 'undefined') {
      this.done = done;
    }else {
      this.done = false;
    }
  }
}