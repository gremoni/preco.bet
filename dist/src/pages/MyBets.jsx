import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { api } from '../lib/api';
import { mockBets, mockMarkets } from '../lib/mockData';
import { SettlementBadge } from '../components/SettlementBadge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { formatUSD, formatDate, shortenAddress } from '../lib/utils';
import { ExternalLink, Wallet } from 'lucide-react';
import { WalletConnect } from '../components/WalletConnect';

export function MyBets() {
  const { address, isConnected } = useAccount();

  const { data: bets = [] } = useQuery({
    queryKey: ['bets', address],
    queryFn: () => api.getBets(address),
    enabled: !!address,
    initialData: isConnected ? mockBets : [],
  });

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Wallet className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Conecte sua Carteira</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Para visualizar suas apostas, você precisa conectar sua carteira Web3
        </p>
        <WalletConnect />
      </div>
    );
  }

  const totalStaked = bets.reduce((sum, bet) => sum + bet.stake_usd, 0);
  const totalWon = bets
    .filter(bet => bet.status === 'won')
    .reduce((sum, bet) => sum + (bet.payout_amount || 0), 0);
  const activeBets = bets.filter(bet => bet.status === 'confirmed' || bet.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Minhas Apostas</h1>
        <p className="text-muted-foreground mt-2">
          Acompanhe todas as suas apostas e resultados
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Apostado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatUSD(totalStaked)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Ganho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatUSD(totalWon)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Apostas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeBets}</div>
          </CardContent>
        </Card>
      </div>

      {/* Bets List */}
      <div className="space-y-4">
        {bets.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Você ainda não fez nenhuma aposta</p>
              <Button className="mt-4" asChild>
                <a href="/markets">Explorar Mercados</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          bets.map((bet) => {
            const market = mockMarkets.find(m => m.id === bet.market_id);
            const option = market?.options.find(o => o.id === bet.option_id);

            return (
              <Card key={bet.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{market?.title || 'Mercado desconhecido'}</h3>
                        <SettlementBadge status={bet.status} />
                      </div>

                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Opção: <span className="font-medium text-foreground">{option?.label}</span></div>
                        <div>Odds: <span className="font-medium text-green-600">{bet.odds.toFixed(2)}x</span></div>
                        <div>Data: {formatDate(bet.created_at)}</div>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">TX:</span>
                        <code className="bg-muted px-2 py-1 rounded">{shortenAddress(bet.tx_hash)}</code>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild>
                          <a 
                            href={`https://etherscan.io/tx/${bet.tx_hash}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="text-sm text-muted-foreground">Aposta</div>
                      <div className="text-xl font-bold">{formatUSD(bet.stake_usd)}</div>
                      
                      {bet.status === 'won' && bet.payout_amount && (
                        <>
                          <div className="text-sm text-muted-foreground">Ganho</div>
                          <div className="text-xl font-bold text-green-600">
                            {formatUSD(bet.payout_amount)}
                          </div>
                        </>
                      )}
                      
                      {(bet.status === 'confirmed' || bet.status === 'pending') && (
                        <>
                          <div className="text-sm text-muted-foreground">Retorno potencial</div>
                          <div className="text-lg font-semibold text-blue-600">
                            {formatUSD(bet.potential_payout)}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
