export const getFormattedTime = (milliseconds) => {
  if (milliseconds === 0) return '00:00:00';
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const remainingSecondsInMinutes = remainingSeconds % 60;

  const hh = hours.toString().padStart(2, '0');
  const mm = minutes.toString().padStart(2, '0');
  const ss = remainingSecondsInMinutes.toString().padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
};
