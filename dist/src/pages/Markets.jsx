import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { mockMarkets } from '../lib/mockData';
import { MarketCard } from '../components/MarketCard';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Search } from 'lucide-react';

export function Markets() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: markets = mockMarkets } = useQuery({
    queryKey: ['markets'],
    queryFn: () => api.getMarkets(),
    initialData: mockMarkets,
  });

  const filteredMarkets = markets.filter((market) => {
    const matchesStatus = statusFilter === 'all' || market.status === statusFilter;
    const matchesType = typeFilter === 'all' || market.type === typeFilter;
    const matchesSearch = market.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          market.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mercados de Apostas</h1>
        <p className="text-muted-foreground mt-2">
          Explore todos os mercados disponíveis e faça suas apostas
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="search">Buscar</Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Buscar mercados..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="scheduled">Agendado</SelectItem>
              <SelectItem value="open">Aberto</SelectItem>
              <SelectItem value="closed">Fechado</SelectItem>
              <SelectItem value="settling">Liquidando</SelectItem>
              <SelectItem value="settled">Finalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="type">Tipo</Label>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger id="type" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="DESSEM">DESSEM</SelectItem>
              <SelectItem value="DECOMP">DECOMP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          {filteredMarkets.length} {filteredMarkets.length === 1 ? 'mercado encontrado' : 'mercados encontrados'}
        </p>

        {filteredMarkets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum mercado encontrado com os filtros selecionados</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMarkets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
