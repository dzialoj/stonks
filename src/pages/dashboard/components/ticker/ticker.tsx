import { ResponsiveContainer, LineChart, Line } from 'recharts';
import useFormatter, { FormatType } from '../../../../hooks/useFormatter';
import { IStockTicker } from '../../../../models/stock-ticker.model';
import './ticker.scss';

interface TickerComponentProps {
  stockTicker: IStockTicker;
  onClickStockTicker: () => void;
}

export default function TickerComponent({ stockTicker, onClickStockTicker }: TickerComponentProps) {
  const { format } = useFormatter();
  return (
    <div className='ticker-container'>
      <span className='stock-name'>{stockTicker.stockName}</span>
      <div className='stock-value-container'>
        <span className='stock-value'>{format(FormatType.Currency, stockTicker.stockValue)}</span>
        <i className='fa-solid fa-circle-chevron-up'></i>
      </div>
      <span className='stock-value'>{stockTicker.stockShares} share(s)</span>
      <ResponsiveContainer width='100%' height={80}>
        <LineChart width={300} height={100} data={stockTicker.stockValueHistorical}>
          <Line type='monotone' dataKey='value' stroke='#dd3594' strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
