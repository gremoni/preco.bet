const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Markets
  async getMarkets(status) {
    const url = status 
      ? `${API_BASE_URL}/markets?status=${status}`
      : `${API_BASE_URL}/markets`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch markets');
    return response.json();
  },

  async getMarket(id) {
    const response = await fetch(`${API_BASE_URL}/markets/${id}`);
    if (!response.ok) throw new Error('Failed to fetch market');
    return response.json();
  },

  // Bets
  async getBets(userAddress) {
    const response = await fetch(`${API_BASE_URL}/bets?address=${userAddress}`);
    if (!response.ok) throw new Error('Failed to fetch bets');
    return response.json();
  },

  async createBet(data) {
    const response = await fetch(`${API_BASE_URL}/bets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create bet');
    return response.json();
  },

  // Payouts
  async getPayouts(userAddress) {
    const response = await fetch(`${API_BASE_URL}/payouts?address=${userAddress}`);
    if (!response.ok) throw new Error('Failed to fetch payouts');
    return response.json();
  },

  // PLD History (for charts)
  async getPLDHistory(submercado, days = 30) {
    const response = await fetch(`${API_BASE_URL}/pld/history?submercado=${submercado}&days=${days}`);
    if (!response.ok) throw new Error('Failed to fetch PLD history');
    return response.json();
  }
};
