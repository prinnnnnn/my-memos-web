export const formatDate = (dateStr: string | null) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
};

export const formatFutureDate = (dateStr: string | null) => {
  if (!dateStr) return "No due date";
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `Overdue by ${Math.abs(diffDays)} day(s)`;
  } else if (diffDays === 0) {
    return "Due today";
  } else if (diffDays === 1) {
    return "Due tomorrow";
  } else if (diffDays <= 7) {
    return `Due in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
  } else {
    const diffWeeks = Math.ceil(diffDays / 7);
    if (diffWeeks <= 4) {
      return `Due in ${diffWeeks} week${diffWeeks > 1 ? 's' : ''}`;
    }
    const diffMonths = Math.ceil(diffDays / 30);
    if (diffMonths <= 12) {
      return `Due in ${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
    }
  }
}

export const isPastDate = (dateStr: string | null) => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const now = new Date();
  return date.getTime() < now.getTime();
}