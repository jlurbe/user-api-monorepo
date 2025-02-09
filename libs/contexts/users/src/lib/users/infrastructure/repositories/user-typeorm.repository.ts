import { Repository } from 'typeorm';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserTypeormEntity } from '../entities/user-typeorm.entity';
import { UserPrimitive } from '../../domain/primitives/user.primitive';
import { SaveUserDTO } from '../../domain/dto/save-user.dto';
import { DatabaseError } from '@user-api-monorepo/shared/errors/database.error';

export class UserTypeormRepository
  extends Repository<UserTypeormEntity>
  implements UserRepository
{
  async getUsers(): Promise<UserPrimitive[]> {
    try {
      const users = await this.find();

      return users;
    } catch (error) {
      console.log(error);
      throw new DatabaseError(this.constructor.name, 'getUsers', '');
    }
  }

  async getUser(id: string): Promise<UserPrimitive | undefined> {
    try {
      const user = await this.findOne({ where: { id } });

      return user ?? undefined;
    } catch (error) {
      console.log(error);
      throw new DatabaseError(this.constructor.name, 'getUser', id);
    }
  }

  async saveUser(user: SaveUserDTO): Promise<void> {
    try {
      await this.save(user);
    } catch (error) {
      console.log(error);
      throw new DatabaseError(
        this.constructor.name,
        'getUser',
        JSON.stringify(user),
      );
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
