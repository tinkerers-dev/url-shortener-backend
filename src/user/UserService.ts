import { type UserCreator, type UserCredentials } from "./UserCreator";

export class UserService implements UserCreator {
  async createUser(userCredentials: UserCredentials): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
