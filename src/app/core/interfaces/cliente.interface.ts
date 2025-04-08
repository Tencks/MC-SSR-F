export interface Client {
    _id?: string;
    codCliente: string;
    fantasia: string;
    nombre: string;
    grupo: string;
    subgrupo: string;
    direccion: {
      calle: string;
      numero: string;
      piso: string;
      departamento: string;
      localidad: string;
      provincia: string;
      pais: string;
    };
    telefonos: {
      principal: string;
      otros: string;
      celular: string;
    };
    sitioWeb: string;
    email: string;
    documentacion: {
      tipoDocumento: string;
      numeroDocumento: string;
      cuit: string;
      vto: Date;
    };
    comercial: {
      categoriaIIBB: string;
      vendedor: string;
      descuento1: number;
      descuento2: number;
      ctaContable: string;
      zona: string;
      recargo: string;
      transporte: string;
      lugarEntrega: string;
      listaPrecio: string;
      condicionPago: string;
      limiteCredito: number;
    };
    fiscal: {
      condicionIVA: string;
      exentoIVA: boolean;
      percepIVA: string;
      agenteRetencion: boolean;
      revendedor: boolean;
    };
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
  }