export interface IStockTicker {
  stockName: string;
  stockValue: number;
  stockShares: number;
  stockValueHistorical: { value: number }[];
}