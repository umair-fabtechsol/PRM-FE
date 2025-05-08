export interface IAdmin {
  id: string;
  name: string;
  email: string;
}

// 2. Define the state structure
export interface IAuthState {
  admin: IAdmin | null;
  loading: boolean;
  error: string | null;
}