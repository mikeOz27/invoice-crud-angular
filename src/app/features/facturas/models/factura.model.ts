export interface FacturaDetalle {
  id?: number;
  product: string;
  quantity: number;
  unitPrice: number;
}

export interface Factura {
  id?: number;
  customer: string;
  date: string;
  details: FacturaDetalle[];
  total?: number;
}
