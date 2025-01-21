export type PaymentStatus = 'pagado' | 'atrasado' | 'extension' | 'parcial' | 'pendiente';

export interface Room {
  id: string;
  number: string;
  floor: string;
  section: string;
  status: PaymentStatus;
  lastPayment: string;
  tenant?: string;
  pendingAmount?: number;
  lastPartialPayment?: number;
}