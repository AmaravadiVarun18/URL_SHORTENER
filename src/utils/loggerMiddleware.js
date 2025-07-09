export function logEvent(event) {
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push({ ...event, timestamp: new Date().toISOString() });
  localStorage.setItem('logs', JSON.stringify(logs));
}
