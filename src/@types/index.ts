export enum Role {
  Admin = 'admin',
  Blogger = 'blogger',
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
  age: number;
  role: Role;
  nationality: string;
  languages: string;
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
