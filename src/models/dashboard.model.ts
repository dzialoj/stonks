import { INetWorthHistory } from './net-worth-history.model';
import { IStockTicker } from './stock-ticker.model';

export interface IDashboard {
  currentNetWorth: number;
  netWorthHistory: INetWorthHistory[];
  stockTickers: IStockTicker[];
}