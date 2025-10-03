import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { api } from '../lib/api';
import { mockMarkets } from '../lib/mockData';
import { useMarketStore } from '../lib/store';
import { OddsLadder } from '../components/OddsLadder';
import { BetSlip } from '../components/BetSlip';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ArrowLeft, Clock, Info, Shield } from 'lucide-react';
import { formatDate, formatUSD, bpsToPercent, formatPLD } from '../lib/utils';

export function MarketDetail() {
  const { id } = useParams();
  const { address } = useAccount();
  const { addToBetSlip } = useMarketStore();
  const [selectedOption, setSelectedOption] = useState(null);
  const [stakeAmount, setStakeAmount] = useState(10);

  const { data: market } = useQuery({
    queryKey: ['market', id],
    queryFn: () => api.getMarket(id),
    initialData: mockMarkets.find(m => m.id === id),
  });

  if (!market) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Mercado não encontrado</p>
        <Link to="/markets">
          <Button className="mt-4">Voltar aos mercados</Button>
        </Link>
      </div>
    );
  }

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    addToBetSlip(market, option, stakeAmount);
  };

  const handlePlaceBet = async (marketId) => {
    if (!address) {
      alert('Conecte sua carteira primeiro');
      return;
    }

    // Simulação de transação blockchain
    console.log('Placing bet:', { marketId, optionId, stakeUsd, address });
    
    // Em produção, aqui seria feita a chamada ao smart contract
    const mockTxHash = `0x${Math.random().toString(16).slice(2)}`;
    
    try {
      await api.createBet({
        market_id: marketId,
        option_id: optionId,
        stake_usd: stakeUsd,
        tx_hash: mockTxHash,
        user_address: address,
      });
      
      alert('Aposta realizada com sucesso!');
    } catch (error) {
      alert('Erro ao registrar aposta. Em modo demo, isso é esperado.');
    }
  };

  const isMarketOpen = market.status === 'open';
  const totalPool = market.options.reduce((sum, opt) => sum + opt.pool_usd, 0);

  return (
    <div className="space-y-6">
      <Link to="/markets">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar aos mercados
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Market Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-2xl">{market.title}</CardTitle>
                  <p className="text-muted-foreground mt-2">{market.description}</p>
                </div>
                <Badge className={isMarketOpen ? 'bg-green-500' : 'bg-gray-500'}>
                  {isMarketOpen ? 'Aberto' : market.status}
                </Badge>
              </div>

              <div className="flex gap-2 mt-4">
                <Badge variant="outline">{market.type}</Badge>
                <Badge variant="outline">{market.submercado}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Abre em</div>
                  <div className="font-medium">{formatDate(market.open_at)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Fecha em</div>
                  <div className="font-medium">{formatDate(market.close_at)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Pool Total</div>
                  <div className="font-medium">{formatUSD(totalPool)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Taxa</div>
                  <div className="font-medium">{bpsToPercent(market.fee_bps)}</div>
                </div>
              </div>

              {market.result_value && (
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <Shield className="h-5 w-5" />
                    Resultado: {formatPLD(market.result_value)}
                  </div>
                  {market.oracle_hash && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Hash do Oracle: {market.oracle_hash}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Odds Ladder */}
          <Card>
            <CardHeader>
              <CardTitle>Opções de Aposta</CardTitle>
            </CardHeader>
            <CardContent>
              <OddsLadder
                options={market.options}
                selectedOptionId={selectedOption?.id}
                onSelectOption={handleSelectOption}
                disabled={!isMarketOpen}
              />
            </CardContent>
          </Card>

          {/* Market Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Regras do Mercado
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <ul>
                <li>As apostas são aceitas até o horário de fechamento do mercado</li>
                <li>A liquidação é feita automaticamente com base nos dados oficiais da CCEE/ONS</li>
                <li>Uma taxa de {bpsToPercent(market.fee_bps)} é aplicada sobre os ganhos</li>
                <li>Todas as transações são registradas em blockchain para transparência</li>
                <li>Em caso de cancelamento do mercado, todas as apostas são reembolsadas</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <BetSlip onPlaceBet={handlePlaceBet} />
          </div>
        </div>
      </div>
    </div>
  );
}
