export type EthMoney = {
  value: number;
  type: 'wei' | 'eth';
}

export type Payable<T> = {
  from: string;
  amount: EthMoney;
  arguments?: T;
}

export type Transaction<T> = {
  from: string;
  arguments: T;
}

export type ContractParams = {
  provider: any;
  contract: any;
}