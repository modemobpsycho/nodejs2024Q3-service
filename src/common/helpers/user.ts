import { User } from '@prisma/client';

export const mapUserBigInt = (user: User | Omit<User, 'password' | 'refreshToken'>) => ({
  ...user,
  createdAt: Number(user.createdAt),
  updatedAt: Number(user.updatedAt),
});
