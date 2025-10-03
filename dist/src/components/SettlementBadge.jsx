import { Bet } from '../types';
import { Badge } from './ui/badge';
import { CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';


const statusConfig = {
  pending: {
    label: 'Pendente',
    icon: <Clock className="h-3 w-3" />,
    className: 'bg-yellow-500 text-white',
  },
  confirmed: {
    label: 'Confirmada',
    icon: <CheckCircle className="h-3 w-3" />,
    className: 'bg-blue-500 text-white',
  },
  won: {
    label: 'Venceu',
    icon: <CheckCircle className="h-3 w-3" />,
    className: 'bg-green-500 text-white',
  },
  lost: {
    label: 'Perdeu',
    icon: <XCircle className="h-3 w-3" />,
    className: 'bg-red-500 text-white',
  },
  refunded: {
    label: 'Reembolsado',
    icon: <RefreshCw className="h-3 w-3" />,
    className: 'bg-gray-500 text-white',
  },
};

export function SettlementBadge({ status }) {
  const config = statusConfig[status];

  return (
    <Badge className={`${config.className} flex items-center gap-1`}>
      {config.icon}
      {config.label}
    </Badge>
  );
}
