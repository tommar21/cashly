export type Currency = "ARS" | "USD" | "BTC";
export type TransactionType = "income" | "expense";
export type Category =
  | "Prioritarios"
  | "Servicios"
  | "Suscripciones"
  | "Extras"
  | "Salario"
  | "Freelancing"
  | "Inversiones"
  | "Otros";

export interface Account {
  id: string;
  user_id: string;
  name: string;
  currency: Currency;
  balance: number;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  account_id: string;
  amount: number;
  type: TransactionType;
  category: Category;
  description: string | null;
  date: string;
  created_at: string;
}

export interface DolarBlueResponse {
  moneda: string;
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

export interface CryptoPriceResponse {
  [key: string]: {
    usd: number;
  };
}
