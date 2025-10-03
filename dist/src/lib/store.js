import { create } from 'zustand';

export const useMarketStore = create((set) => ({
  betSlip: [],
  
  addToBetSlip: (market, option, stake_usd) => 
    set((state) => {
      const existing = state.betSlip.find(item => item.market.id === market.id);
      if (existing) {
        return {
          betSlip: state.betSlip.map(item =>
            item.market.id === market.id
              ? { ...item, option, stake_usd }
              : item
          )
        };
      }
      return {
        betSlip: [...state.betSlip, { market, option, stake_usd }]
      };
    }),
  
  removeFromBetSlip: (marketId) =>
    set((state) => ({
      betSlip: state.betSlip.filter(item => item.market.id !== marketId)
    })),
  
  updateStake: (marketId, stake_usd) =>
    set((state) => ({
      betSlip: state.betSlip.map(item =>
        item.market.id === marketId
          ? { ...item, stake_usd }
          : item
      )
    })),
  
  clearBetSlip: () => set({ betSlip: [] })
}));
