import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR });
  } catch {
    return dateString;
  }
};
