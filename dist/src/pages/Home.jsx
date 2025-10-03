import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Zap, 
  Wallet, 
  TrendingUp, 
  Shield, 
  ArrowRight, 
  CheckCircle2,
  Clock,
  DollarSign,
  BarChart3,
  Lock
} from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="flex justify-center">
          <Badge variant="outline" className="px-4 py-2 text-sm">
            <Zap className="h-4 w-4 mr-2 text-green-600" />
            Plataforma Descentralizada de Apostas em Energia
          </Badge>
        </div>
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Aposte no Futuro da Energia
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          PREÇO.BET é a primeira plataforma descentralizada para apostas em Preços de Liquidação das Diferenças (PLD) 
          do mercado de energia brasileiro. Utilize criptomoedas para apostar e receba seus ganhos automaticamente 
          em sua carteira.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Link to="/markets">
            <Button size="lg" className="gap-2">
              Ver Mercados
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="#como-funciona">
            <Button size="lg" variant="outline">
              Como Funciona
            </Button>
          </a>
        </div>
      </section>

      {/* O que é PLD */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">O que é PLD?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Entenda o mercado em que você está apostando
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Preço de Liquidação das Diferenças</h3>
                    <p className="text-muted-foreground">
                      O PLD é o preço de referência usado para valorar a energia comercializada no mercado de curto prazo 
                      brasileiro. É calculado pela CCEE (Câmara de Comercialização de Energia Elétrica) e varia conforme 
                      oferta e demanda.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Volatilidade e Oportunidades</h3>
                    <p className="text-muted-foreground">
                      O PLD é altamente volátil, sendo influenciado por fatores como níveis de reservatórios, 
                      condições climáticas, demanda de energia e disponibilidade de geração. Essa volatilidade 
                      cria oportunidades de apostas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-muted p-6 rounded-lg space-y-3">
                  <h4 className="font-semibold">Tipos de Mercados</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm"><strong>DESSEM:</strong> Previsões diárias (curto prazo)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-sm"><strong>DECOMP:</strong> Previsões semanais (médio prazo)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-6 rounded-lg space-y-3">
                  <h4 className="font-semibold">Submercados</h4>
                  <p className="text-sm text-muted-foreground">
                    O Brasil é dividido em 4 submercados: <strong>Sudeste/Centro-Oeste</strong>, <strong>Sul</strong>, 
                    <strong>Nordeste</strong> e <strong>Norte</strong>. Cada um possui seu próprio PLD.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Como Funciona</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Aposte em faixas de preço do PLD e ganhe se acertar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-2">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>1. Escolha um Mercado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">
                Navegue pelos mercados disponíveis (DESSEM ou DECOMP) e escolha o submercado e período que deseja apostar.
              </p>
              <div className="bg-muted p-3 rounded text-sm">
                <strong>Exemplo:</strong> PLD SE/CO - Média Diária 04/10/2025
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>2. Selecione uma Faixa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">
                Cada mercado possui múltiplas faixas de preço. Escolha a faixa onde você acredita que o PLD será liquidado.
              </p>
              <div className="bg-muted p-3 rounded text-sm space-y-1">
                <div><strong>Faixa A:</strong> R$ 50-100/MWh - Odds: 2.5x</div>
                <div><strong>Faixa B:</strong> R$ 100-150/MWh - Odds: 3.2x</div>
                <div><strong>Faixa C:</strong> R$ 150-200/MWh - Odds: 4.1x</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-2">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>3. Defina o Valor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">
                Escolha quanto deseja apostar. O sistema calcula automaticamente seu potencial de ganho baseado nas odds.
              </p>
              <div className="bg-muted p-3 rounded text-sm space-y-1">
                <div><strong>Aposta:</strong> $100 USDC</div>
                <div><strong>Odds:</strong> 3.2x</div>
                <div className="text-green-600 font-semibold"><strong>Ganho Potencial:</strong> $320 USDC</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Passo a Passo */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Passo a Passo para Apostar</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Siga estas etapas simples para fazer sua primeira aposta
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">Conecte sua Carteira</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Clique em "Connect Wallet" no canto superior direito e selecione sua carteira preferida 
                    (MetaMask, WalletConnect, etc.). A plataforma suporta redes Ethereum e BSC.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Importante:</strong> Certifique-se de ter USDC, USDT ou outra stablecoin em sua carteira para fazer apostas.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-lg">Navegue pelos Mercados</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Acesse a página "Mercados" e explore as opções disponíveis. Use os filtros para encontrar 
                    mercados por status (aberto, agendado), tipo (DESSEM, DECOMP) ou submercado.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Status: Aberto</Badge>
                    <Badge variant="outline">Tipo: DESSEM</Badge>
                    <Badge variant="outline">Submercado: SE/CO</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-lg">Faça sua Aposta</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Clique no mercado desejado, analise as faixas de preço disponíveis e suas odds. 
                    Selecione a faixa, defina o valor da aposta e confirme a transação em sua carteira.
                  </p>
                  <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      <strong>Dica:</strong> Quanto maior a odds, maior o risco e o potencial de retorno. Analise o histórico de PLD antes de apostar.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <h3 className="font-semibold text-lg">Aguarde a Liquidação</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Após o período de apostas, o mercado é fechado. A CCEE/ONS publica o PLD oficial e 
                    o sistema verifica automaticamente qual faixa foi a vencedora.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-muted p-2 rounded text-center">
                      <div className="font-semibold">Aberto</div>
                      <div className="text-xs text-muted-foreground">Apostas ativas</div>
                    </div>
                    <div className="bg-muted p-2 rounded text-center">
                      <div className="font-semibold">Fechado</div>
                      <div className="text-xs text-muted-foreground">Aguardando PLD</div>
                    </div>
                    <div className="bg-muted p-2 rounded text-center">
                      <div className="font-semibold">Liquidado</div>
                      <div className="text-xs text-muted-foreground">Resultado final</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/50 bg-green-500/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-lg">Receba Automaticamente</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Se sua aposta for vencedora, os ganhos são <strong>depositados automaticamente em sua carteira</strong> 
                    através de smart contracts. Não é necessário solicitar saque ou preencher formulários.
                  </p>
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded border border-green-200 dark:border-green-800 space-y-2">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm font-semibold">Pagamento Instantâneo</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Os smart contracts executam o pagamento automaticamente após a liquidação. 
                      Você verá o saldo em sua carteira em poucos minutos.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Vantagens */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Por que Apostar na PREÇO.BET?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Segurança, transparência e pagamentos automáticos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center space-y-2">
              <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">100% Descentralizado</h3>
              <p className="text-sm text-muted-foreground">
                Smart contracts garantem que as regras sejam cumpridas automaticamente, sem intermediários.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center space-y-2">
              <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold">Pagamento Automático</h3>
              <p className="text-sm text-muted-foreground">
                Ganhou? O dinheiro cai direto na sua carteira. Sem burocracia, sem espera.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center space-y-2">
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
                <Lock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">Transparência Total</h3>
              <p className="text-sm text-muted-foreground">
                Todas as transações são registradas na blockchain e podem ser auditadas publicamente.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center space-y-2">
              <div className="bg-orange-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold">Dados Oficiais</h3>
              <p className="text-sm text-muted-foreground">
                Utilizamos dados oficiais da CCEE/ONS para liquidação dos mercados.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Pronto para Começar?</h2>
        <p className="text-lg mb-6 opacity-90">
          Conecte sua carteira e faça sua primeira aposta em menos de 2 minutos
        </p>
        <Link to="/markets">
          <Button size="lg" variant="secondary" className="gap-2">
            Explorar Mercados
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
