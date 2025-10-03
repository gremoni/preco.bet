# PREÇO.BET - Plataforma de Apostas em PLD

Plataforma descentralizada para apostas em Preços de Liquidação das Diferenças (PLD) do mercado de energia brasileiro.

## 🚀 Tecnologias

- **React 19** + **Vite** - Framework e build tool
- **React Router** - Navegação
- **TanStack Query** - Gerenciamento de dados
- **Wagmi** + **Viem** - Integração Web3
- **Zustand** - Gerenciamento de estado
- **Tailwind CSS** + **shadcn/ui** - Interface
- **Lucide React** - Ícones
- **Recharts** - Gráficos
- **date-fns** - Formatação de datas

## 📦 Instalação

### Opção 1: Usando pnpm (Recomendado)

```bash
# Instalar pnpm globalmente (se não tiver)
npm install -g pnpm

# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm run dev

# Build para produção
pnpm run build
```

### Opção 2: Usando npm

```bash
# Instalar dependências
npm install --legacy-peer-deps

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Opção 3: Usando yarn

```bash
# Instalar dependências
yarn install

# Executar em desenvolvimento
yarn dev

# Build para produção
yarn build
```

## 📋 Tipos de Mercados

A plataforma suporta 12 tipos diferentes de mercados de apostas:

### DECOMP (Semanal/Mensal)

1. **PLD DECOMP Revisão Seguinte - SE/CO**
2. **PLD DECOMP Revisão Seguinte - Descolamento SE/CO x NE**
3. **PLD DECOMP RV0 Mês Seguinte - SE/CO**
4. **PLD DECOMP RV0 Mês Seguinte - Descolamento SE/CO x NE**
5. **PLD DECOMP Média Mensal (DECOMP) - SE/CO**
6. **PLD DECOMP Média Mensal (DECOMP) - Descolamento SE/CO x NE**
7. **PLD Média Diária Mensal (DESSEM) - SE/CO**
8. **PLD Média Diária Mensal (DESSEM) - Descolamento SE/CO x NE**

### DESSEM (Diário)

9. **PLD DESSEM Dia Seguinte - Média Diária SE/CO**
10. **PLD DESSEM Dia Seguinte - Descolamento SE/CO x NE**
11. **PLD DESSEM - Horas no Piso (Dia Seguinte)**
12. **PLD DESSEM - Horas no Teto (Dia Seguinte)**

## 🎯 Faixas de Apostas

- **PLD SE/CO**: R$ 58,60 a R$ 751,73 (saltos de R$ 10,00)
- **Descolamento SE/CO x NE**: -R$ 693,13 a +R$ 693,13 (saltos de R$ 10,00)
- **Horas (Piso/Teto)**: 0 a 24 horas

## 📁 Estrutura do Projeto

```
bet-pld/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── ui/          # Componentes shadcn/ui
│   │   ├── BetSlip.jsx
│   │   ├── Header.jsx
│   │   ├── MarketCard.jsx
│   │   ├── OddsLadder.jsx
│   │   ├── PLDChart.jsx
│   │   ├── SettlementBadge.jsx
│   │   └── WalletConnect.jsx
│   ├── pages/           # Páginas da aplicação
│   │   ├── Home.jsx
│   │   ├── Markets.jsx
│   │   ├── MarketDetail.jsx
│   │   └── MyBets.jsx
│   ├── lib/             # Utilitários e configurações
│   │   ├── api.js       # Funções de API
│   │   ├── mockData.js  # Dados mock
│   │   ├── store.js     # Store Zustand
│   │   ├── utils.js     # Funções auxiliares
│   │   └── wagmi.js     # Configuração wagmi
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_WALLETCONNECT_PROJECT_ID=seu_project_id_aqui
```

### Endereços dos Contratos

Atualize os endereços dos contratos em `src/lib/wagmi.js`:

```javascript
export const ESCROW_ADDRESSES = {
  [mainnet.id]: '0xSeuEnderecoAqui',
  [sepolia.id]: '0xSeuEnderecoAqui',
  [bsc.id]: '0xSeuEnderecoAqui',
  [bscTestnet.id]: '0xSeuEnderecoAqui',
};
```

## 🌐 Deploy

### Build Local

```bash
pnpm run build
```

Os arquivos de produção estarão em `dist/`.

### Deploy em Produção

O projeto pode ser deployado em:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- Qualquer servidor web estático

## 📝 Integração com Backend

Para integrar com seu backend:

1. Atualize as funções em `src/lib/api.js`
2. Substitua os dados mock por chamadas reais de API
3. Implemente a lógica de liquidação automática
4. Integre com dados oficiais da CCEE/ONS
5. Conecte com smart contracts para escrow

## 🔐 Segurança

- Todas as transações são assinadas pela carteira do usuário
- Smart contracts garantem execução automática
- Dados registrados na blockchain para transparência
- Pagamentos automáticos via smart contracts

## 📄 Licença

Este projeto é privado e proprietário.

## 🤝 Suporte

Para dúvidas ou suporte, entre em contato com a equipe de desenvolvimento.
