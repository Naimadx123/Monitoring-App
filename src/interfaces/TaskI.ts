export enum TaskPriority {
  LOW,
  MEDIUM,
  HIGH,
}

export interface TaskI {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  done: boolean;
}
