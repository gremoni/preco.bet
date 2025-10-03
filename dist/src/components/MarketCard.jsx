import { Market } from '../types';
import { formatDate, formatUSD, bpsToPercent } from '../lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';


const statusColors = {
  scheduled: 'bg-blue-500',
  open: 'bg-green-500',
  closed: 'bg-yellow-500',
  settling: 'bg-orange-500',
  settled: 'bg-gray-500',
};

const statusLabels = {
  scheduled: 'Agendado',
  open: 'Aberto',
  closed: 'Fechado',
  settling: 'Liquidando',
  settled: 'Finalizado',
};

export function MarketCard({ market }) {
  const totalPool = market.options.reduce((sum, opt) => sum + opt.pool_usd, 0);
  const bestOdds = Math.max(...market.options.map(opt => opt.odds));

  return (
    <Link to={`/market/${market.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-2">{market.title}</CardTitle>
              <CardDescription className="mt-1 line-clamp-2">
                {market.description}
              </CardDescription>
            </div>
            <Badge className={`${statusColors[market.status]} text-white shrink-0`}>
              {statusLabels[market.status]}
            </Badge>
          </div>
          
          <div className="flex gap-2 mt-3">
            <Badge variant="outline">{market.type}</Badge>
            <Badge variant="outline">{market.submercado}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Fecha em</div>
                <div className="font-medium">{formatDate(market.close_at)}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Melhor Odd</div>
                <div className="font-medium text-green-600">{bestOdds.toFixed(2)}x</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Pool Total</div>
                <div className="font-medium">{formatUSD(totalPool)}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
            Taxa da plataforma: {bpsToPercent(market.fee_bps)}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
