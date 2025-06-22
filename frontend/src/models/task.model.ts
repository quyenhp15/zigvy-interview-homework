export enum TaskStatus {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}

export type Task = {
  id: string;
  title: string;
  description: string;
  status?: TaskStatus;
  dueDate?: Date;
};
