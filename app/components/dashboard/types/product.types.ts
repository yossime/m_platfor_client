export type CurrencyType = 'USD' | 'EUR' | 'GBP';

export interface Section {
  id?: string;
  title?: string;
  body?: string;
  isVisible?: boolean;
}

export interface Product {
  id?: string;
  title: string;
  SKU: string;
  description?: string; 
  barcode?: string; 
  quantity?: number; 
  price: number;
  currencyType?: CurrencyType;
  sections?: Section[];
  createdAt?: any;
  isActive?: boolean;
  image?:string;
  model?:string;
  images?: string[];
}



