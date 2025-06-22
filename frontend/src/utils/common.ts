import { Task } from "../models";

export const getStatusColor = (status: Task["status"]) => {
  switch (status) {
    case "To Do":
      return "default";
    case "In Progress":
      return "blue";
    case "Done":
      return "green";
    default:
      return "default";
  }
};
