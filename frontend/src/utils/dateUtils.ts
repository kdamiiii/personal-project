export const normalizeTime = (timeStr: string) => {
  if (timeStr.length === 8) return timeStr;
  return `${timeStr}:00`;
};

export const to12HourFormat = (timeStr: string) => {
  // Supports "HH:mm" or "HH:mm:ss"
  try {
    if (!timeStr) return timeStr;
    const [hourStr, minuteStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12; // Convert 0 to 12 for AM
    return `${hour}:${minute} ${ampm}`;
  } catch {
    return timeStr;
  }
};

export const formatDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  } catch {
    return dateStr;
  }
};
