import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatUSD(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPLD(value) {
  return `${formatBRL(value)}/MWh`;
}

export function formatOdds(odds) {
  return odds.toFixed(2) + 'x';
}

export function formatDate(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
}

export function formatShortDate(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'dd/MM/yyyy', { locale: ptBR });
}

export function formatTime(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'HH:mm', { locale: ptBR });
}

export function shortenAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function calculatePotentialPayout(stake, odds, feeBps) {
  const grossPayout = stake * odds;
  const fee = grossPayout * (feeBps / 10000);
  return grossPayout - fee;
}

export function bpsToPercent(bps) {
  return (bps / 100).toFixed(2) + '%';
}
