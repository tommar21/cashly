// Re-export Prisma types for consistency
export type { Currency, TransactionType, BankAccount, Transaction } from "@prisma/client";

// Category types for UI
export type ExpenseCategory =
  | "Prioritarios"
  | "Servicios"
  | "Suscripciones"
  | "Extras";

export type IncomeCategory =
  | "Salario"
  | "Freelancing"
  | "Inversiones"
  | "Otros";

export type Category = ExpenseCategory | IncomeCategory;

// API response types
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

// Account type for components (with balance as number instead of Decimal)
export interface AccountForUI {
  id: string;
  userId: string;
  name: string;
  currency: "ARS" | "USD" | "BTC";
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
