// Função auxiliar para gerar faixas de PLD SE/CO
function generatePLDRanges() {
  const ranges = [];
  const min = 58.60;
  const max = 751.73;
  const step = 10;
  
  for (let i = min; i < max; i += step) {
    const rangeMin = i;
    const rangeMax = Math.min(i + step, max);
    ranges.push({
      id: `range-${ranges.length + 1}`,
      label: `R$ ${rangeMin.toFixed(2)} - R$ ${rangeMax.toFixed(2)}`,
      min_value: rangeMin,
      max_value: rangeMax,
      odds: (Math.random() * 3 + 1.5).toFixed(2),
      pool_usd: Math.floor(Math.random() * 5000) + 500
    });
  }
  
  return ranges;
}

// Função auxiliar para gerar faixas de descolamento
function generateDescolamentoRanges() {
  const ranges = [];
  const min = -693.13;
  const max = 693.13;
  const step = 10;
  
  for (let i = min; i <= max; i += step) {
    const rangeMin = i;
    const rangeMax = Math.min(i + step, max);
    ranges.push({
      id: `desc-range-${ranges.length + 1}`,
      label: `R$ ${rangeMin.toFixed(2)} - R$ ${rangeMax.toFixed(2)}`,
      min_value: rangeMin,
      max_value: rangeMax,
      odds: (Math.random() * 4 + 1.5).toFixed(2),
      pool_usd: Math.floor(Math.random() * 3000) + 300
    });
  }
  
  return ranges;
}

// Função auxiliar para gerar opções de horas (0-24)
function generateHourOptions() {
  const options = [];
  for (let i = 0; i <= 24; i++) {
    options.push({
      id: `hour-${i}`,
      label: `${i} ${i === 1 ? 'hora' : 'horas'}`,
      value: i,
      odds: (Math.random() * 8 + 1.5).toFixed(2),
      pool_usd: Math.floor(Math.random() * 2000) + 200
    });
  }
  return options;
}

// Datas auxiliares
const now = new Date();
const tomorrow = new Date(now.getTime() + 86400000);
const nextWeek = new Date(now.getTime() + 7 * 86400000);
const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

export const mockMarkets = [
  // 1. PLD DECOMP revisão seguinte
  {
    id: 'decomp-rv-next-seco',
    type: 'DECOMP',
    metric: 'rv_next',
    submercado: 'SE_CO',
    status: 'open',
    open_at: new Date(now.getTime() - 3 * 86400000).toISOString(), // Quinta-feira passada
    close_at: new Date(now.getTime() + 2 * 86400000).toISOString(), // Próxima quarta
    title: 'PLD DECOMP Revisão Seguinte - SE/CO',
    description: 'Aposte na faixa do PLD DECOMP para a próxima revisão (SE/CO). Apostas abertas de quinta a quarta.',
    fee_bps: 250,
    options: generatePLDRanges().slice(0, 15) // Primeiras 15 faixas para exemplo
  },

  // 2. PLD DECOMP revisão seguinte (descolamento SE/CO x NE)
  {
    id: 'decomp-rv-next-desc',
    type: 'DECOMP',
    metric: 'rv_next_descolamento',
    submercado: 'SE_CO_NE',
    status: 'open',
    open_at: new Date(now.getTime() - 3 * 86400000).toISOString(),
    close_at: new Date(now.getTime() + 2 * 86400000).toISOString(),
    title: 'PLD DECOMP Revisão Seguinte - Descolamento SE/CO x NE',
    description: 'Aposte no descolamento entre PLD SE/CO e NE na próxima revisão DECOMP.',
    fee_bps: 250,
    options: generateDescolamentoRanges().slice(0, 20)
  },

  // 3. PLD DECOMP RV0 mês seguinte
  {
    id: 'decomp-rv0-next-month-seco',
    type: 'DECOMP',
    metric: 'rv0_next_month',
    submercado: 'SE_CO',
    status: 'open',
    open_at: new Date(now.getFullYear(), now.getMonth() - 1, 25).toISOString(), // PMO mês anterior
    close_at: new Date(nextMonth.getTime() - 2 * 86400000).toISOString(), // Último domingo antes do PMO
    title: 'PLD DECOMP RV0 Mês Seguinte - SE/CO',
    description: 'Aposte no PLD da RV0 do mês seguinte (SE/CO). Apostas encerram no último domingo antes do PMO.',
    fee_bps: 250,
    options: generatePLDRanges().slice(0, 15)
  },

  // 4. PLD DECOMP RV0 mês seguinte (descolamento SE/CO x NE)
  {
    id: 'decomp-rv0-next-month-desc',
    type: 'DECOMP',
    metric: 'rv0_next_month_descolamento',
    submercado: 'SE_CO_NE',
    status: 'open',
    open_at: new Date(now.getFullYear(), now.getMonth() - 1, 25).toISOString(),
    close_at: new Date(nextMonth.getTime() - 2 * 86400000).toISOString(),
    title: 'PLD DECOMP RV0 Mês Seguinte - Descolamento SE/CO x NE',
    description: 'Aposte no descolamento SE/CO x NE da RV0 do mês seguinte.',
    fee_bps: 250,
    options: generateDescolamentoRanges().slice(0, 20)
  },

  // 5. PLD DECOMP média mês seguinte (média dos PLDs do DECOMP apenas)
  {
    id: 'decomp-avg-month-decomp-seco',
    type: 'DECOMP',
    metric: 'monthly_avg_decomp',
    submercado: 'SE_CO',
    status: 'open',
    open_at: new Date(now.getFullYear(), now.getMonth() - 1, 25).toISOString(),
    close_at: new Date(nextMonth.getTime() - 2 * 86400000).toISOString(),
    title: 'PLD DECOMP Média Mensal (DECOMP) - SE/CO',
    description: 'Aposte na média mensal dos PLDs do DECOMP (não inclui DESSEM) para o mês seguinte (SE/CO).',
    fee_bps: 250,
    options: generatePLDRanges().slice(0, 15)
  },

  // 6. PLD DECOMP média mês seguinte (DECOMP) (descolamento SE/CO x NE)
  {
    id: 'decomp-avg-month-decomp-desc',
    type: 'DECOMP',
    metric: 'monthly_avg_decomp_descolamento',
    submercado: 'SE_CO_NE',
    status: 'open',
    open_at: new Date(now.getFullYear(), now.getMonth() - 1, 25).toISOString(),
    close_at: new Date(nextMonth.getTime() - 2 * 86400000).toISOString(),
    title: 'PLD DECOMP Média Mensal (DECOMP) - Descolamento SE/CO x NE',
    description: 'Aposte no descolamento SE/CO x NE da média mensal dos PLDs do DECOMP.',
    fee_bps: 250,
    options: generateDescolamentoRanges().slice(0, 20)
  },

  // 7. PLD DECOMP média mês seguinte (média diária mensal - DESSEM)
  {
    id: 'decomp-avg-month-dessem-seco',
    type: 'DECOMP',
    metric: 'monthly_avg_dessem',
    submercado: 'SE_CO',
    status: 'open',
    open_at: new Date(now.getFullYear(), now.getMonth() - 1, 25).toISOString(),
    close_at: new Date(nextMonth.getTime() - 2 * 86400000).toISOString(),
    title: 'PLD Média Diária Mensal (DESSEM) - SE/CO',
    description: 'Aposte na média diária mensal calculada pelo DESSEM para o mês seguinte (SE/CO).',
    fee_bps: 250,
    options: generatePLDRanges().slice(0, 15)
  },

  // 8. PLD DECOMP média mês seguinte (DESSEM) (descolamento SE/CO x NE)
  {
    id: 'decomp-avg-month-dessem-desc',
    type: 'DECOMP',
    metric: 'monthly_avg_dessem_descolamento',
    submercado: 'SE_CO_NE',
    status: 'open',
    open_at: new Date(now.getFullYear(), now.getMonth() - 1, 25).toISOString(),
    close_at: new Date(nextMonth.getTime() - 2 * 86400000).toISOString(),
    title: 'PLD Média Diária Mensal (DESSEM) - Descolamento SE/CO x NE',
    description: 'Aposte no descolamento SE/CO x NE da média diária mensal (DESSEM).',
    fee_bps: 250,
    options: generateDescolamentoRanges().slice(0, 20)
  },

  // 9. PLD DESSEM dia seguinte (média diária)
  {
    id: 'dessem-next-day-avg-seco',
    type: 'DESSEM',
    metric: 'daily_avg',
    submercado: 'SE_CO',
    status: 'open',
    open_at: new Date(now.getTime() - 12 * 3600000).toISOString(), // Após divulgação PLD horário
    close_at: new Date(tomorrow.setHours(12, 0, 0, 0)).toISOString(), // 12:00 do dia atual
    title: 'PLD DESSEM Dia Seguinte - Média Diária SE/CO',
    description: 'Aposte na média diária do PLD para o dia seguinte (SE/CO). Encerra às 12:00.',
    fee_bps: 250,
    options: generatePLDRanges().slice(0, 15)
  },

  // 10. PLD DESSEM dia seguinte (média diária) (descolamento SE/CO x NE)
  {
    id: 'dessem-next-day-avg-desc',
    type: 'DESSEM',
    metric: 'daily_avg_descolamento',
    submercado: 'SE_CO_NE',
    status: 'open',
    open_at: new Date(now.getTime() - 12 * 3600000).toISOString(),
    close_at: new Date(tomorrow.setHours(12, 0, 0, 0)).toISOString(),
    title: 'PLD DESSEM Dia Seguinte - Descolamento SE/CO x NE',
    description: 'Aposte no descolamento SE/CO x NE da média diária do dia seguinte.',
    fee_bps: 250,
    options: generateDescolamentoRanges().slice(0, 20)
  },

  // 11. PLD DESSEM dia seguinte (quantidade de horas no piso)
  {
    id: 'dessem-next-day-floor-hours',
    type: 'DESSEM',
    metric: 'hours_floor',
    submercado: 'SE_CO',
    status: 'open',
    open_at: new Date(now.getTime() - 12 * 3600000).toISOString(),
    close_at: new Date(tomorrow.setHours(12, 0, 0, 0)).toISOString(),
    title: 'PLD DESSEM - Horas no Piso (Dia Seguinte)',
    description: 'Aposte em quantas horas (0-24) o PLD ficará no preço mínimo (piso) no dia seguinte.',
    fee_bps: 250,
    options: generateHourOptions()
  },

  // 12. PLD DESSEM dia seguinte (quantidade de horas no teto)
  {
    id: 'dessem-next-day-ceiling-hours',
    type: 'DESSEM',
    metric: 'hours_ceiling',
    submercado: 'SE_CO',
    status: 'open',
    open_at: new Date(now.getTime() - 12 * 3600000).toISOString(),
    close_at: new Date(tomorrow.setHours(12, 0, 0, 0)).toISOString(),
    title: 'PLD DESSEM - Horas no Teto (Dia Seguinte)',
    description: 'Aposte em quantas horas (0-24) o PLD ficará no preço máximo (teto) no dia seguinte.',
    fee_bps: 250,
    options: generateHourOptions()
  },

  // Mercados fechados (exemplos)
  {
    id: 'dessem-yesterday-closed',
    type: 'DESSEM',
    metric: 'daily_avg',
    submercado: 'SE_CO',
    status: 'closed',
    open_at: new Date(now.getTime() - 2 * 86400000).toISOString(),
    close_at: new Date(now.getTime() - 86400000).toISOString(),
    title: 'PLD DESSEM - Média Diária SE/CO (Ontem)',
    description: 'Mercado encerrado. Aguardando liquidação.',
    fee_bps: 250,
    options: generatePLDRanges().slice(0, 10)
  },

  // Mercados liquidados (exemplos)
  {
    id: 'dessem-settled-example',
    type: 'DESSEM',
    metric: 'daily_avg',
    submercado: 'SE_CO',
    status: 'settled',
    open_at: new Date(now.getTime() - 5 * 86400000).toISOString(),
    close_at: new Date(now.getTime() - 4 * 86400000).toISOString(),
    settlement_value: 185.50,
    title: 'PLD DESSEM - Média Diária SE/CO (Liquidado)',
    description: 'Mercado liquidado. PLD final: R$ 185,50/MWh',
    fee_bps: 250,
    options: generatePLDRanges().slice(0, 10)
  }
];

// Mock de apostas do usuário
export const mockBets = [
  {
    id: 'bet-1',
    market_id: 'dessem-next-day-avg-seco',
    option_id: 'range-5',
    user_address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    stake_usd: 100,
    odds: 2.5,
    potential_payout: 250,
    status: 'pending',
    placed_at: new Date(now.getTime() - 3600000).toISOString(),
  },
  {
    id: 'bet-2',
    market_id: 'dessem-next-day-floor-hours',
    option_id: 'hour-3',
    user_address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    stake_usd: 50,
    odds: 4.2,
    potential_payout: 210,
    status: 'pending',
    placed_at: new Date(now.getTime() - 7200000).toISOString(),
  },
  {
    id: 'bet-3',
    market_id: 'dessem-settled-example',
    option_id: 'range-8',
    user_address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    stake_usd: 200,
    odds: 1.8,
    potential_payout: 360,
    status: 'won',
    placed_at: new Date(now.getTime() - 5 * 86400000).toISOString(),
    settled_at: new Date(now.getTime() - 4 * 86400000).toISOString(),
  },
];

// Mock de histórico de PLD
export const mockPLDHistory = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(now.getTime() - (29 - i) * 86400000).toISOString().split('T')[0],
  value: 150 + Math.random() * 100 - 50,
}));
