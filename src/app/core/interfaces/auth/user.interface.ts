export interface UserInterface {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;

  }

  export interface LoginUserInterface {
    name?: string;
    email?: string;
    password: string;
  }