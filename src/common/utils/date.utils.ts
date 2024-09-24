import { parse } from 'date-fns';

export function parseDate(dateStr: string): Date {
  return parse(dateStr, 'dd/MM/yyyy', new Date());
}
