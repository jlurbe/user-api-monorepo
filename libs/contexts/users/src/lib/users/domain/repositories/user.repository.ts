import { SaveUserDTO } from '../dto/save-user.dto';
import { UserPrimitive } from '../primitives/user.primitive';

export interface UserRepository {
  getUsers(): Promise<UserPrimitive[]>;
  getUser(id: UserPrimitive['id']): Promise<UserPrimitive | undefined>;
  saveUser(user: SaveUserDTO): Promise<UserPrimitive>;
  deleteUser(id: UserPrimitive['id']): Promise<void>;
}
