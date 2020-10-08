export interface BotData {
  id: string;
  api: string;
  isAlive: boolean;
  isActive: boolean;
}

export enum DepositStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface DepositData {
  id: string;
  uid: string;
  date: string;
  walletAddress: string;
  status: DepositStatus;
  binanceTransactionId?: string; // added once it has been seen in deposit history
  resolvedDate?: string; // added once it has resolved (status is SUCCESS)
  message?: string; // used for errors
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  COMMISSION = 'COMMISSION',
}

export interface BaseTransactionData {
  date: string;
  amount: number;
  type: TransactionType;
}

export interface DepositTransactionData extends BaseTransactionData {
  uid: string;
  walletAddress: string;
  depositId: string;
  binanceTransactionId: string;
  date: string;
  amount: number;
}

export type TransactionData = DepositTransactionData;
