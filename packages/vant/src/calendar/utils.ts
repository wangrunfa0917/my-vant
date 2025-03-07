import { createNamespace } from '../utils';

const [name, bem, t] = createNamespace('calendar');

export { name, bem, t };

export const formatMonthTitle = (date: Date) =>
  t('monthTitle', date.getFullYear(), date.getMonth() + 1);

export function compareMonth(date1: Date, date2: Date) {
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();

  if (year1 === year2) {
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }

  return year1 > year2 ? 1 : -1;
}

export function compareDay(day1: Date, day2: Date) {
  const compareMonthResult = compareMonth(day1, day2);

  if (compareMonthResult === 0) {
    const date1 = day1.getDate();
    const date2 = day2.getDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }

  return compareMonthResult;
}

export const cloneDate = (date: Date) => new Date(date);

export const cloneDates = (dates: Date | Date[]) =>
  Array.isArray(dates) ? dates.map(cloneDate) : cloneDate(dates);

export function getDayByOffset(date: Date, offset: number) {
  const cloned = cloneDate(date);
  cloned.setDate(cloned.getDate() + offset);
  return cloned;
}

export function getMonthByOffset(date: Date, offset: number) {
  const cloned = cloneDate(date);
  cloned.setMonth(cloned.getMonth() + offset);

  if (cloned.getDate() !== date.getDate()) {
    cloned.setDate(0);
  }

  return cloned;
}

export function getYearByOffset(date: Date, offset: number) {
  const cloned = cloneDate(date);
  cloned.setFullYear(cloned.getFullYear() + offset);

  if (cloned.getDate() !== date.getDate()) {
    cloned.setDate(0);
  }

  return cloned;
}

export const getPrevDay = (date: Date) => getDayByOffset(date, -1);
export const getNextDay = (date: Date) => getDayByOffset(date, 1);
export const getPrevMonth = (date: Date) => getMonthByOffset(date, -1);
export const getNextMonth = (date: Date) => getMonthByOffset(date, 1);
export const getPrevYear = (date: Date) => getYearByOffset(date, -1);
export const getNextYear = (date: Date) => getYearByOffset(date, 1);
export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export function calcDateNum(date: [Date, Date]) {
  const day1 = date[0].getTime();
  const day2 = date[1].getTime();
  return (day2 - day1) / (1000 * 60 * 60 * 24) + 1;
}

/**
 * Checks if the given date is in the last row of its month in a calendar view
 * @param date The date to check
 * @param offset The offset of the first day of the month
 * @returns boolean indicating whether the date is in the last row
 */
export function isLastRowInMonth(date: Date, offset: number = 0) {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const currentPos = offset + date.getDate() - 1;
  const lastDayPos = offset + lastDay.getDate() - 1;

  return Math.floor(currentPos / 7) === Math.floor(lastDayPos / 7);
}
