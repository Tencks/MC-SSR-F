
export interface Proveedor {
    _id?: string;
    codProveedor: string;
    fantasia: string;
    nombre: string;
    domicilio: string;
    codLocalidad: string;
    localidad: string;
    provincia: string;
    email: string;
    sitioWeb: string;
    telefonos: string;
    otrosTel: string;
    fax: string;
    codZona: string;
    zona: string;
    condicionIVA: string;
    cuit: string;
    vtoCuit: Date;
    tipoCpa: string;
    cai: string;
    vtoCai: Date;
    ocPendienteActivacion: boolean;
    importeMinimoOC: number;
    codConcepto: string;
    concepto: string;
    conceptoActivo: boolean;
    codCuentaCte: string;
    cuentaCte: string;
    codClienteCanje: string;
    clienteCanje: string;
    dctoProntoPago: number;
    notas: string;
    formaPago: {
        dias: number;
        porcentaje: number;
    };
    lugarEntrega: string;
    contactoVenta: string;
    contactoCobranza: string;
    horarios: string;
    proveedorActivo: boolean;
    retenciones: {
        agenteRetencion: boolean;
        regGanancia: string;
        tasaIVA: string;
        categGanancias: string;
        nroIngresosBrutos: string;
        fechaVtoIIBB: Date;
        catIngresosBrutos: string;
        inscriptoDrei: boolean;
        alicuotaActividad: string;
        coeficiente: number;
    };
    contribucionPatronal: {
        empleador: boolean;
        fechaEmpleador: Date;
    };
    chatarra: {
        regGananciaChatarra: string;
        regIVAChatarra: string;
    };
    reducciones: Array<{
        fechaEmision: Date;
        fechaPublicacion: Date;
        fechaVigencia: Date;
        nroCertificado: string;
        periodoFiscal: string;
        porcentaje: number;
        resolucionGral: string;
    }>;
    cuentasBancarias: Array<{
        banco: string;
        sucursal: string;
        ctaBancaria: string;
        cbu: string;
        titular: string;
        alias: string;
    }>;
    createdAt?: Date;
    updatedAt?: Date;
}