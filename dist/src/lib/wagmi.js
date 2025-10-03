import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, bsc, bscTestnet } from 'wagmi/chains';
import { injected, metaMask, walletConnect } from 'wagmi/connectors';

// Configuração do WalletConnect (opcional - requer projectId)
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id';

export const config = createConfig({
  chains: [mainnet, sepolia, bsc, bscTestnet],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
});

// ABI do contrato Escrow (placeholder - ajustar conforme contrato real)
export const ESCROW_ABI = [
  {
    inputs: [
      { name: 'marketId', type: 'bytes32' },
      { name: 'optionId', type: 'bytes32' },
    ],
    name: 'placeBet',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: 'betId', type: 'bytes32' }],
    name: 'claimPayout',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

// Endereços dos contratos por rede (placeholder)
export const ESCROW_ADDRESSES = {
  [mainnet.id]: '0x0000000000000000000000000000000000000000',
  [sepolia.id]: '0x0000000000000000000000000000000000000000',
  [bsc.id]: '0x0000000000000000000000000000000000000000',
  [bscTestnet.id]: '0x0000000000000000000000000000000000000000',
};
