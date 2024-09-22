

export type CurrencyType = 'USD' | 'EUR' | 'GBP';

export interface Product {
    id?: string;
    SKU: string;
    name: string;
    price: number;
    currencyType: CurrencyType;
    createdAt?: any;
    isActive?: boolean;
  }