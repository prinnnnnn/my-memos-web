import { TaskStatus, LearningStatus } from "@/lib/types";
export { formatDate, formatDateTime, formatFutureDate, isPastDate } from "./date";

export const getStatusColor = (status: TaskStatus | LearningStatus) => {
  switch (status) {
    case "To Do":
    case "Not Started":
      return "bg-gray-100 text-gray-700";
    case "In Progress":
      return "bg-blue-100 text-blue-700";
    case "Done":
    case "Completed":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};