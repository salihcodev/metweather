export const getDaysWithinRange = (endDate: string, startDate: string): number => {
  const diffInMs = Number(new Date(endDate)) - Number(new Date(startDate));
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays;
};
export default getDaysWithinRange;
