function formatDateString(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
}

export default formatDateString;
