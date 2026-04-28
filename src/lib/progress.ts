export const calculateOverallProgress = (progressValues: number[]) =>
  Math.round(progressValues.reduce((acc, v) => acc + v, 0) / Math.max(progressValues.length, 1));
