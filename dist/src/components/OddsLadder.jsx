import { OddsOption } from '../types';
import { formatUSD } from '../lib/utils';
import { Button } from './ui/button';
import { TrendingUp } from 'lucide-react';


export function OddsLadder({ options, selectedOptionId, onSelectOption, disabled }) {
  const totalPool = options.reduce((sum, opt) => sum + opt.pool_usd, 0);

  return (
    <div className="space-y-2">
      {options.map((option) => {
        const poolPercentage = totalPool > 0 ? (option.pool_usd / totalPool) * 100 : 0;
        const isSelected = selectedOptionId === option.id;

        return (
          <Button
            key={option.id}
            variant={isSelected ? 'default' : 'outline'}
            className="w-full h-auto p-4 justify-between hover:scale-[1.02] transition-transform"
            onClick={() => onSelectOption(option)}
            disabled={disabled}
          >
            <div className="flex flex-col items-start gap-1">
              <span className="font-semibold text-base">{option.label}</span>
              <span className="text-xs text-muted-foreground">
                Pool: {formatUSD(option.pool_usd)} ({poolPercentage.toFixed(1)}%)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-5 w-5" />
                  {option.odds.toFixed(2)}x
                </div>
                <div className="text-xs text-muted-foreground">odds</div>
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
