import { useState } from 'react';
import { useMarketStore } from '../lib/store';
import { formatUSD, calculatePotentialPayout } from '../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X, Wallet } from 'lucide-react';
import { useAccount } from 'wagmi';


export function BetSlip({ onPlaceBet }) {
  const { betSlip, removeFromBetSlip, updateStake, clearBetSlip } = useMarketStore();
  const { isConnected } = useAccount();
  const [isPlacing, setIsPlacing] = useState(false);

  const handlePlaceBets = async () => {
    if (!isConnected || betSlip.length === 0) return;

    setIsPlacing(true);
    try {
      for (const item of betSlip) {
        await onPlaceBet(item.market.id, item.option.id, item.stake_usd);
      }
      clearBetSlip();
    } catch (error) {
      console.error('Error placing bets:', error);
    } finally {
      setIsPlacing(false);
    }
  };

  const totalStake = betSlip.reduce((sum, item) => sum + item.stake_usd, 0);
  const totalPotentialPayout = betSlip.reduce(
    (sum, item) => sum + calculatePotentialPayout(item.stake_usd, item.option.odds, item.market.fee_bps),
    0
  );

  if (betSlip.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cupom de Apostas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Selecione uma opção em um mercado para começar
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Cupom de Apostas ({betSlip.length})</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearBetSlip}>
            Limpar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {betSlip.map((item) => (
          <div key={item.market.id} className="border rounded-lg p-3 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="font-medium text-sm line-clamp-1">{item.market.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.option.label}</div>
                <div className="text-sm font-semibold text-green-600 mt-1">
                  Odds: {item.option.odds.toFixed(2)}x
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => removeFromBetSlip(item.market.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <Label htmlFor={`stake-${item.market.id}`} className="text-xs">
                Valor da aposta (USD)
              </Label>
              <Input
                id={`stake-${item.market.id}`}
                type="number"
                min="1"
                step="1"
                value={item.stake_usd}
                onChange={(e) => updateStake(item.market.id, Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div className="text-xs text-muted-foreground">
              Retorno potencial: {formatUSD(calculatePotentialPayout(item.stake_usd, item.option.odds, item.market.fee_bps))}
            </div>
          </div>
        ))}

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total apostado:</span>
            <span className="font-semibold">{formatUSD(totalStake)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Retorno potencial total:</span>
            <span className="font-semibold text-green-600">{formatUSD(totalPotentialPayout)}</span>
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={handlePlaceBets}
          disabled={!isConnected || isPlacing || totalStake === 0}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isPlacing ? 'Processando...' : isConnected ? 'Confirmar Apostas' : 'Conecte sua Carteira'}
        </Button>
      </CardContent>
    </Card>
  );
}
