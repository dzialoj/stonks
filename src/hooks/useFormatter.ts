export enum FormatType {
  Currency,
}
export default function useFormatter() {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const format = (type: FormatType, value: any): string => {
    switch (type) {
      case FormatType.Currency:
        return currencyFormatter.format(value);
      default:
        break;
    }
  };

  return { format }
}
