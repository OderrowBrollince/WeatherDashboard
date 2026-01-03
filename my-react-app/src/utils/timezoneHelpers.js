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
    timeZone: 'UTC', // We'll handle timezone manually
  });
  
  // Format date manually to respect timezone
  const dateOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'short' 
  };
  const timeOptions = { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  };
  
  // Use Intl.DateTimeFormat to properly format with timezone
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    ...dateOptions,
    timeZone: 'UTC',
  });
  
  // For timezone-aware formatting, we need to calculate manually
  const hours = localTime.getUTCHours() + (timezoneOffset / 3600);
  const minutes = localTime.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const timeStr = `${displayHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
  
  // Better approach: use toLocaleString with calculated offset
  const utcDate = new Date(localTime.getTime() - (timezoneOffset * 1000));
  const adjustedDate = new Date(utcDate.getTime() + (timezoneOffset * 1000));
  
  return {
    dateStr: adjustedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    }),
    timeStr: adjustedDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
    date: adjustedDate,
  };
};

/**
 * Format time for sunrise/sunset in specific timezone
 * @param {Date} date - Date object (sunrise/sunset)
 * @param {number} timezoneOffset - Timezone offset in seconds from UTC
 * @returns {string} Formatted time string
 */
export const formatTimeInTimezone = (date, timezoneOffset) => {
  // Convert the date to the city's timezone
  const utcTime = date.getTime();
  const localTime = new Date(utcTime + (timezoneOffset * 1000));
  return localTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};