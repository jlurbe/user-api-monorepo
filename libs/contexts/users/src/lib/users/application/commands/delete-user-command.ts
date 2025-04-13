import { UserPrimitive } from '../../domain/primitives/user.primitive';

export type DeleteUserCommand = Pick<UserPrimitive, 'id'>;
