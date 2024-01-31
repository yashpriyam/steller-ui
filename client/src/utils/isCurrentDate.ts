export const isCurrentDate = (date: Date | string): boolean =>
  new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
