/**
 * Get current time in a specific timezone (offset in seconds from UTC)
 * @param {number} timezoneOffset - Timezone offset in seconds from UTC
 * @returns {Date} Date object representing current time in that timezone
 */
export const getTimeInTimezone = (timezoneOffset) => {
  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
  const localTime = new Date(utcTime + (timezoneOffset * 1000));
  return localTime;
};

/**
 * Format date and time for a specific timezone
 * @param {number} timezoneOffset - Timezone offset in seconds from UTC
 * @returns {object} Object with formatted dateStr and timeStr
 */
export const getFormattedDateTime = (timezoneOffset) => {
  const localTime = getTimeInTimezone(timezoneOffset);
  
  const dateStr = localTime.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });
  
  const timeStr = localTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  return { dateStr, timeStr, date: localTime };
};

/**
 * Format time for sunrise/sunset in specific timezone
 * @param {Date} date - Date object (sunrise/sunset) - already in UTC
 * @param {number} timezoneOffset - Timezone offset in seconds from UTC
 * @returns {string} Formatted time string
 */
export const formatTimeInTimezone = (date, timezoneOffset) => {
  if (!date || !(date instanceof Date)) {
    return 'N/A';
  }
  
  // The date is already a Date object created from UTC timestamp
  // We need to convert it to the city's local time
  // Get the UTC time in milliseconds
  const utcTime = date.getTime();
  
  // Convert to local time by adding the timezone offset
  // timezoneOffset is in seconds, so multiply by 1000 to get milliseconds
  const localTime = new Date(utcTime + (timezoneOffset * 1000));
  
  return localTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};