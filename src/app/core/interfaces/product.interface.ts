export interface Product {
    _id?: string;
    codProducto: string;
    codigoBarra?: string;
    nombre: string;
    descripcion?: string;
    imagen?: string;
    precio: number;
    porcentajeGanancia: number;
    alicuotaIva: '0%' | '10.5%' | '21%';
    precioConIva: number;
    unidadMedida: 'LT' | 'KG' | 'K' | 'MT' | 'BOLSAS' | 'FRASCO' | 'ML' | 'TN' | 'UNIDAD' | 'OTRO';
    grupo: string;
    subgrupo: string;
    stock: number;
    stockMinimo: number;
    categoria: string;
    marca: string;
    modelo?: string;
    viaCompra: 'De Ventas y Compras' | 'Compra Externa';
    tipoCompra: 'Compra Externa' | 'Compra Interna';
    facturaPor: 'Unidad';
    peso: number;
    unidadPeso?: 'KG' | 'GR' | 'LT' | 'ML';
    unidadBulto: number;
    conversion: number;
    cliente?: string;
    ctaContableVta?: string;
    ctaContableCpa?: string;
    especificacionesTecnicas?: {
        nomenclador?: string;
        especificacionIngenieria?: string;
        numerador?: string;
    };
    serializado: boolean;
    requiereAutorizacion: boolean;
    editable: boolean;
    active: boolean;
    createdBy: string;
    createdAt?: string;
    updatedAt?: string;
}

