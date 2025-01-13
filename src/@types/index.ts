export enum Role {
  Admin = 'admin',
  User = 'user',
}

export type UserSession = {
  id: number;
};

export type DatabaseDate = {
  created_at: Date;
  updated_at: Date;
};

export type DefaultUserData = {
  role: Role;
};

export interface User extends DatabaseDate {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  role: Role;
  nationality: string;
  date_of_birth: Date;
  bio: string;
}

export type SignUpPayload = Omit<
  User,
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'role'
  | 'username'
  | 'first_name'
  | 'last_name'
  | 'age'
  | 'nationality'
  | 'languages'
  | 'date_of_birth'
  | 'bio'
>;

export type ServiceSuccess<T> = {
  data: T;
  status: number;
  success: true;
};

export type ServiceError = {
  error: string;
  status: number;
  success: false;
};
