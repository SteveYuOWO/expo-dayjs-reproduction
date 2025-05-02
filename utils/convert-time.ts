interface DateParts {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
}

/**
 * Convert a timestamp to a timezone
 * @param timestamp - The timestamp to convert
 * @param targetTimezone - The timezone to convert to
 * @returns The formatted date string in "YYYY-MM-DD HH:mm:ss" format
 */
export function convertTimestampToTimezone(
  timestamp: number | string,
  targetTimezone: string
): string {
  const parsedTimestamp = typeof timestamp === 'string'
    ? Number(timestamp)
    : timestamp;

  const date = new Date(parsedTimestamp);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid timestamp provided');
  }

  const options: Intl.DateTimeFormatOptions = {
    timeZone: targetTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  try {
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);

    const partObj = {} as DateParts;
    parts.forEach(part => {
      if (part.type !== 'literal') {
        partObj[part.type as keyof DateParts] = part.value;
      }
    });

    // validate required fields
    const requiredFields: (keyof DateParts)[] = ['year', 'month', 'day', 'hour', 'minute', 'second'];
    for (const field of requiredFields) {
      if (!partObj[field]) {
        throw new Error(`Missing ${field} in formatted date parts`);
      }
    }

    return `${partObj.year}-${partObj.month}-${partObj.day} ${partObj.hour}:${partObj.minute}:${partObj.second}`;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Invalid timezone specified: ${e.message}`);
    }
    throw new Error('Unknown error occurred during timezone conversion');
  }
}
