import { UserPrimitive } from '../../domain/primitives/user.primitive';

export type GetUserQuery = Pick<UserPrimitive, 'id'>;
