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
    stockActual: number;
    stockMinimo: number;
    stockMaximo: number;
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
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: {
        name:string;
        email:string;
    };
    updatedBy?: {
        name:string;
        email:string;
    };
}

export interface ProductGrupo {
    _id?: string;
    codGrupo: number;
    nombre: string;
    prefijo?: string;
    bonif?: number;
    comision?: number;
    editable: boolean;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: {
        name:string;
        email:string;
    };
    updatedBy?: {
        name:string;
        email:string;
    };
}

export interface ProductSubGrupo {
    _id?: string;
    codSubGrupo: number;
    nombre: string;
    prefijo?: string;
    bonif?: number;
    comision?: number;
    editable: boolean;
    active: boolean;
    grupo: string | ProductGrupo;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: {
        name:string;
        email:string;
    };
    updatedBy?: {
        name:string;
        email:string;
    };
}
