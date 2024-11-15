export interface CreatePayment {
  transaction: string;
  body: Payment;
}

export interface Payment {
  requestSource: string;
  merchantCode: string;
  orderNumber: string;
  publicKey: string;
  amount: string;
}

export interface ResponsePayment {
  code: string;
  message: string;
  response: Token;
}

export interface Token {
  token: string;
}
