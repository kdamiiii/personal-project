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
