import { parse, format } from 'date-fns';

export function useBrazilianTimeFormat() {
  return function formatToBrazilianTime(time12h) {
    const parsed = parse(time12h, 'hh:mm a', new Date());
    return format(parsed, 'HH:mm');
  }
}