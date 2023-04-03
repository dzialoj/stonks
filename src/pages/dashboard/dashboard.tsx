import { useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import useApi from '../../hooks/useApi';
import useFormatter, { FormatType } from '../../hooks/useFormatter';
import { IDashboard } from '../../models/dashboard.model';
import TickerComponent from './components/ticker/ticker';
import './dashboard.scss';

export interface IDashboardPageComponentInterfaceProps {}

export default function DashboardPageComponent({}: IDashboardPageComponentInterfaceProps) {
  const { data, loading, error, request } = useApi<IDashboard>({ url: 'dashboard.mock.json', requestType: 'GET' });
  const { format } = useFormatter();

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async (): Promise<void> => {
    request();
  };

  return (
    <div className='dashboard-container'>
      {!loading ? (
        <>
          <h1>Current Net Worth: {format(FormatType.Currency, data?.currentNetWorth)}</h1>
          <div className='table'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart width={500} height={300} data={data?.netWorthHistory} margin={{ bottom: 16 }}>
                <CartesianGrid stroke='#00FF7F' />
                <XAxis dataKey='month' stroke='#00FF7F' />
                <YAxis dataKey='netWorth' stroke='#00FF7F' />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='netWorth' stroke='#dd3594' strokeWidth='2' activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className='tickers'>
            {data?.stockTickers?.map((x) => (
              <TickerComponent stockTicker={x} onClickStockTicker={() => console.log(x)} />
            ))}
          </div>
        </>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
