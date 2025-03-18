import { AuditLogsType } from '@/types';
export const AUDITLOGS_LIST: AuditLogsType[] = Array.from({ length: 5 }, (_, index) => ({
  id: `user-${index}`,
  name: `John Doe ${index}`,
  email: `john@example.com`,
  activity: `	this is for the des`,
  date: `Nov, 10, 2024 5:57`,
  imageUrl: "/images/image.jpg",
}));
