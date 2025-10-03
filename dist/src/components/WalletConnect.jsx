import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { Button } from './ui/button';
import { Wallet, LogOut } from 'lucide-react';
import { shortenAddress, formatUSD } from '../lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function WalletConnect() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  if (!isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <Wallet className="mr-2 h-4 w-4" />
            Conectar Carteira
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Escolha uma carteira</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {connectors.map((connector) => (
            <DropdownMenuItem
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Wallet className="mr-2 h-4 w-4" />
          {shortenAddress(address)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Minha Carteira</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-2 space-y-1">
          <div className="text-sm">
            <span className="text-muted-foreground">Endereço:</span>
            <div className="font-mono text-xs mt-1">{address}</div>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Rede:</span>
            <div className="font-medium mt-1">{chain?.name || 'Desconhecida'}</div>
          </div>
          {balance && (
            <div className="text-sm">
              <span className="text-muted-foreground">Saldo:</span>
              <div className="font-medium mt-1">
                {Number(balance.formatted).toFixed(4)} {balance.symbol}
              </div>
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => disconnect()}>
          <LogOut className="mr-2 h-4 w-4" />
          Desconectar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
