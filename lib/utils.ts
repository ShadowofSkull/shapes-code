/**
 * Format timestamp as "HH:MM:SS YYYY-MM-DD"
 * Example: "14:23:45 2025-10-21"
 */
export function formatTimestamp(date: Date | string): string {
  const d = new Date(date);
  
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${hours}:${minutes}:${seconds} ${year}-${month}-${day}`;
}

/**
 * Color mapping for shapes
 */
export const colorMap: Record<string, string> = {
  red: '#FF4757',
  blue: '#3742FA',
  green: '#2ED573',
  yellow: '#FFA502',
};

