export interface UserDataInterface {
  id: string;
  name: string;
  email: string;
  role: string;
}

  export interface LoginUserInterface {
    name?: string;
    email?: string;
    password: string;
  }
  
  export interface RegisterUserInterface extends LoginUserInterface {
    name: string;
    email:string;
    role?: string;
  }

  export interface AuthResponse {
    message: string;
    token: string;
    refreshToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      active:boolean;
    };
  }