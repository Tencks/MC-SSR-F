export interface Product {
    _id?: string;
    cod_producto: string;
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
    active: boolean;
    createdBy: string;
    createdAt?: Date;
    updatedAt?: Date;
}