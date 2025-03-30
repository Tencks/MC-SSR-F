export interface Cliente {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    documentType: string;
    documentNumber: string;
    ivaType: string;
    active: boolean;
    createdBy: string;
    createdAt?: Date;
    updatedAt?: Date;
}