export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterAccountRequest {
  email: string;
  password: string;
  name: string;
  document: string;
  type: 'PERSONAL' | 'BUSINESS';
}

export interface UserInfoRequest {
  userId: number;
}
