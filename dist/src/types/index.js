// Type definitions as JSDoc comments for better IDE support

/**
 * @typedef {'scheduled' | 'open' | 'closed' | 'settling' | 'settled'} MarketStatus
 */

/**
 * @typedef {'DESSEM' | 'DECOMP'} MarketType
 */

/**
 * @typedef {'daily_avg' | 'monthly_avg' | 'rv0' | 'revision' | 'spread_ne' | 'hours_floor' | 'hours_ceiling'} MetricType
 */

/**
 * @typedef {'SE_CO' | 'NE' | 'S' | 'N'} Submercado
 */

/**
 * @typedef {Object} OddsOption
 * @property {string} id
 * @property {string} label
 * @property {number} [min_value]
 * @property {number} [max_value]
 * @property {number} odds
 * @property {number} pool_usd
 */

/**
 * @typedef {Object} Market
 * @property {string} id
 * @property {MarketType} type
 * @property {MetricType} metric
 * @property {Submercado} submercado
 * @property {MarketStatus} status
 * @property {string} open_at
 * @property {string} close_at
 * @property {string} [settlement_at]
 * @property {string} title
 * @property {string} description
 * @property {OddsOption[]} options
 * @property {number} fee_bps
 * @property {string} [oracle_hash]
 * @property {number} [result_value]
 */

/**
 * @typedef {Object} Bet
 * @property {string} id
 * @property {string} market_id
 * @property {string} option_id
 * @property {string} user_address
 * @property {number} stake_usd
 * @property {number} odds
 * @property {number} potential_payout
 * @property {string} tx_hash
 * @property {'pending' | 'confirmed' | 'won' | 'lost' | 'refunded'} status
 * @property {string} created_at
 * @property {string} [settled_at]
 * @property {number} [payout_amount]
 */

/**
 * @typedef {Object} WalletInfo
 * @property {string} address
 * @property {number} chain_id
 * @property {number} balance_usd
 * @property {boolean} connected
 */

/**
 * @typedef {Object} BetSlipItem
 * @property {Market} market
 * @property {OddsOption} option
 * @property {number} stake_usd
 */

export {};
