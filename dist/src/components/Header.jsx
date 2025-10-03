import { Link, useLocation } from 'react-router-dom';
import { WalletConnect } from './WalletConnect';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Início' },
  { path: '/markets', label: 'Mercados' },
  { path: '/my-bets', label: 'Minhas Apostas' },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Zap className="h-6 w-6 text-green-600" />
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                PREÇO.BET
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={location.pathname === item.path ? 'default' : 'ghost'}
                    size="sm"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <WalletConnect />
        </div>
      </div>
    </header>
  );
}
