import { UserPrimitive } from '../../domain/primitives/user.primitive';

export type UpdateUserCommand = Partial<Omit<UserPrimitive, 'id'>> &
  Pick<UserPrimitive, 'id'>;
