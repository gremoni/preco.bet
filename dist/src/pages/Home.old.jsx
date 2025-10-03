import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { mockMarkets, mockPLDHistory } from '../lib/mockData';
import { MarketCard } from '../components/MarketCard';
import { PLDChart } from '../components/PLDChart';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TrendingUp, DollarSign, Users, Activity } from 'lucide-react';
import { formatUSD } from '../lib/utils';

export function Home() {
  // Usar dados mock se a API não estiver disponível
  const { data: markets = mockMarkets } = useQuery({
    queryKey: ['markets', 'open'],
    queryFn: () => api.getMarkets('open'),
    initialData: mockMarkets.filter(m => m.status === 'open'),
  });

  const { data: pldHistory = mockPLDHistory } = useQuery({
    queryKey: ['pld-history'],
    queryFn: () => api.getPLDHistory('SE_CO', 30),
    initialData: mockPLDHistory,
  });

  const openMarkets = markets.filter(m => m.status === 'open');
  const totalVolume = markets.reduce((sum, m) => 
    sum + m.options.reduce((s, o) => s + o.pool_usd, 0), 0
  );

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-2">PREÇO.BET</h1>
        <p className="text-xl opacity-90">
          Plataforma de apostas em Preços de Liquidação das Diferenças do setor elétrico brasileiro
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Mercados Abertos</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openMarkets.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatUSD(totalVolume)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">PLD Atual SE/CO</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 185,50</div>
            <p className="text-xs text-muted-foreground">por MWh</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Apostadores Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
          </CardContent>
        </Card>
      </div>

      {/* PLD Chart */}
      <PLDChart data={pldHistory} />

      {/* Featured Markets */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Mercados em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {openMarkets.slice(0, 6).map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>Como Funciona</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>
            A plataforma PREÇO.BET permite que você aposte em faixas de valores do Preço de Liquidação 
            das Diferenças (PLD), calculado pela CCEE. Escolha um mercado, selecione uma faixa de 
            preço e faça sua aposta usando stablecoins (USDT/USDC).
          </p>
          <p>
            Todos os mercados são liquidados automaticamente com base nos dados oficiais da CCEE/ONS. 
            As apostas são registradas em blockchain para total transparência e segurança.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
