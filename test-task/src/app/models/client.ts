export interface IClient {
  _id: string;
  amount: string;
  type: string;
  name: Name;
  company: string;
  email: string;
  phone: string;
  address: string;
}
export interface Name {
  first: string;
  last: string;
}

export enum TransactionEnum {
  INCOME = 'income',
  OUTCOME = 'outcome',
  LOAN = 'loan',
  INVESTMENT = 'investment',
}
