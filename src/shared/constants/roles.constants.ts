export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
  GUEST = 'guest',
}

export const ROLE_PERMISSIONS = {
  [UserRole.ADMIN]: ['*'],
  [UserRole.MODERATOR]: ['read', 'write', 'update'],
  [UserRole.USER]: ['read', 'write'],
  [UserRole.GUEST]: ['read'],
} as const;
