// Get current UTC time
const nowUTC = new Date().toISOString();

// Get user's local timezone (IANA format, e.g., "America/New_York")
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Optionally, get user's local time
const localTime = new Date().toLocaleString();

// Package together
const userLoginInfo = {
  utcTime: nowUTC,
  timezone: userTimezone,
  localTime: localTime
};

console.log(userLoginInfo);
