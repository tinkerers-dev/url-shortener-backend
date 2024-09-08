export type UserCredentials = {
  email: string;
  password: string;
};

export interface UserService {
  createUser(userCredentials: UserCredentials): Promise<void>;
}
