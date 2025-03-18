import { RolesAndPermissionType } from '@/types';
export const ROLESANDPERMISSION_LIST: RolesAndPermissionType[] = Array.from({ length: 5 }, (_, index) => ({
  id: `user-${index}`,
  title: `John Doe`,
  permissions: ['edit', 'delete', 'create', 'new', 'add', 'read', 'own'],
  date: `dec, 07 2024 9:32pm`,
}));
