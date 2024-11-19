import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (date) => {
  return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: fr });
};

export const formatRelativeDate = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
};