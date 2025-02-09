import { UserPrimitive } from '../primitives/user.primitive';

export type SaveUserDTO = Partial<Omit<UserPrimitive, 'id'>> &
  Pick<UserPrimitive, 'id'>;
