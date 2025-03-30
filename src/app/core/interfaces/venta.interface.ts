import { Cliente } from "./cliente.interface";

export interface VentaItem {
    producto: string;
    cod_producto: string;
    cantidad: number;
    precioUnitario: number;
    descuento: number;
    subtotal: number;
    alicuotaIva: '0%' | '10.5%' | '21%'  // Added this field
}

export interface Venta {
    _id?: string;
    puntoVenta: string;
    numeroVenta: string;
    cliente: string | Cliente; //dudas aca
    items: VentaItem[];
    subtotal: number;
    iva: number;
    descuentoTotal: number;
    total: number;
    metodoPago: 'efectivo' | 'cuenta corriente';
    estadoPago: 'pendiente' | 'pagado' | 'parcial' | 'cancelado';
    vendedor: string;
    estado: 'borrador' | 'completada' | 'cancelada';
    observaciones?: string;
    createdAt?: Date;
    updatedAt?: Date;
}