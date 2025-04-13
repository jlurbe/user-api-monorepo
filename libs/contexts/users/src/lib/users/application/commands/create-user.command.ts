import { UserPrimitive } from '../../domain/primitives/user.primitive';

export type CreateUserCommand = Omit<UserPrimitive, 'id'>;
