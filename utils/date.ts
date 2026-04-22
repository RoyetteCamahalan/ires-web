import moment from "moment";
moment().format();

export const isValidDate = (dob: any) => {
  return dob !== null && dob !== "";
};

/**
 * Sets the time of a given date to the specified time string.
 *
 * @param {Date} startDate - The original date object.
 * @param {string|Date} timeString - The time string in "HH:mm:ss" format or a Date object.
 * @returns {Date} - A new Date object with the updated time.
 */
export const setDateToTime = (startDate: any, timeString: any) => {
  // check if timeString is an date object
  if (timeString instanceof Date) {
    return new Date(
      startDate.setHours(
        timeString.getHours(),
        timeString.getMinutes(),
        timeString.getSeconds(),
      ),
    );
  } else if (typeof timeString === "string") {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return new Date(startDate.setHours(hours, minutes, seconds));
  }
  return new Date(startDate);
};

/**
 * Sets the time of a given date to the specified time string.
 *
 * @param {Date} startDate - The original date object.
 * @param {string} timeString - The time string in "HH:mm:ss" format.
 * @returns {Date} - A new Date object with the updated time.
 */
export const setDateToTimeUTC = (startDate: any, timeString: any) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const startD = new Date(startDate);
  // Set the time on the date and return it as a string with local timezone offset
  const dateWithTime = moment.utc(startD).set({
    hour: hours,
    minute: minutes,
    second: seconds,
    millisecond: 0,
  });
  return dateWithTime.toISOString();
};

/**
 * Calculates the time span between two time strings in HH:mm:ss format.
 * @param {string} startTime - Start time in HH:mm:ss format.
 * @param {string} endTime - End time in HH:mm:ss format.
 * @returns {Object} - An object containing hours, minutes, and seconds.
 */
export const calculateTimeSpan = (startTime: string, endTime: string) => {
  const start = moment(startTime, "HH:mm:ss");
  const end = moment(endTime, "HH:mm:ss");

  let duration = moment.duration(end.diff(start));

  // Adjust for cases where end time is on the next day
  if (duration.asSeconds() < 0) {
    duration = moment.duration(end.add(1, "day").diff(start));
  }

  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return { hours, minutes, seconds };
};

/**
 * Parses a time string and returns a Date object if valid
 * @param {string} time - Time string in h:mm A format
 * @param {function} callback - Callback function to handle the parsed time
 */
let parseTimeTimeout: NodeJS.Timeout;
export const parseTime = (time = "", callback: (date: Date) => void) => {
  clearTimeout(parseTimeTimeout);
  parseTimeTimeout = setTimeout(() => {
    if (time.length >= 3) {
      const parsedTime = moment(time, "h:mm A");
      const isValid = parsedTime.isValid();
      if (isValid) {
        callback(parsedTime.toDate());
      }
    }
  }, 700);
};

/**
 * Converts a UTC date string to a local Date object.
 * @param {string} dateString - The UTC date string.
 * @returns {Date} - The local Date object.
 */
export const convertToLocalTime = (dateString: string) => {
  const date = moment.utc(dateString);
  return date.local().toDate();
};

//add function to format datetime to specific format, it should accept a date, format and bool convertToLocal as parameters
export const formatDate = (
  date: Date | string,
  format: string = "YYYY-MM-DD HH:mm:ss",
  convertToLocal = true,
) => {
  if (!isValidDate(date)) return "";
  let momentDate = moment(date);
  if (convertToLocal) {
    momentDate = moment.utc(date).local();
  }
  return momentDate.format(format);
};

export const weekdayLabelMap = new Map([
  [0, "Sunday"],
  [1, "Monday"],
  [2, "Tuesday"],
  [3, "Wednesday"],
  [4, "Thursday"],
  [5, "Friday"],
  [6, "Saturday"],
]);
