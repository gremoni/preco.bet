import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './lib/wagmi';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Markets } from './pages/Markets';
import { MarketDetail } from './pages/MarketDetail';
import { MyBets } from './pages/MyBets';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/market/:id" element={<MarketDetail />} />
                <Route path="/my-bets" element={<MyBets />} />
              </Routes>
            </main>
            <footer className="border-t mt-12">
              <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
                <p>© 2025 PREÇO.BET. Plataforma de apostas em Preços de Liquidação das Diferenças.</p>
                <p className="mt-2">
                  Dados oficiais fornecidos pela CCEE/ONS. Todas as transações são registradas em blockchain.
                </p>
              </div>
            </footer>
          </div>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
