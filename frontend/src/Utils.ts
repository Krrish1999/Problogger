import { format, parseISO } from 'date-fns';
import type { StringOptions } from 'sass-embedded';

export default function formatCustomDate(dateString: string): string {
 
  const date = parseISO(dateString);


  return format(date, 'do MMMM yyyy');
}