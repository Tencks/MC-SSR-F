export interface Theme {
    _id: string;
    name: string;
    backgroundColor: {
      name: string;
      value: string;
    };
    backgroundNavbar:{
      name:string;
      value:string;
    },
    backgroundCard:{
      name: string;
      value: string;
    },
    textColor: {
      name: string;
      value: string;
    };
    language: {
      name: string;
      code: string;
    };
    dark_mode: boolean;
  }