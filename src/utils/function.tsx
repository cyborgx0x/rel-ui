import { format, getTime, formatDistanceToNow } from 'date-fns';
import { replace } from 'lodash';
import numeral from 'numeral';

export function fCurrency(number: number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number: number) {
  return numeral(number).format();
}

export function fShortenNumber(number: number) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fData(number: number) {
  return numeral(number).format('0.0 b');
}

// ----------------------------------------------------------------------

export function fDate(date: string) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date: string) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fTimestamp(date: string) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: string) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date: string) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export const getTokenStorage = async () => {
  return window.localStorage.getItem('serviceToken');
};
