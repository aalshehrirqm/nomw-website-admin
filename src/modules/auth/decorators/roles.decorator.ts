import { SetMetadata } from '@nestjs/common';

export enum UserRole {
  ADMIN = 'admin',
  CONTENT_MANAGER = 'content_manager',
  EDITOR = 'editor',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
export const AllowedTo = (...roles: UserRole[]) =>
  SetMetadata(ROLES_KEY, roles);
