const ConvertToISO8601 = (date: string | null): string | null => {
  if (!date) return null;

  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/;

  if (!iso8601Regex.test(date)) return null;

  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
};

export default ConvertToISO8601;
