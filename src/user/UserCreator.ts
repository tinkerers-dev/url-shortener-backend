export type UserCredentials = {
  email: string;
  password: string;
};

export interface UserCreator {
  createUser(userCredentials: UserCredentials): Promise<void>;
}
