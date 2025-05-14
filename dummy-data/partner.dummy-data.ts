import { PartnerType } from '@/types';

export const PARTNERS_LIST: PartnerType[] = Array.from({ length: 5 }, (_, index) => ({
  id: `user-${index}`,
  name: `John Doe ${index}`,
  email: `johndoe${index}@example.com`,
  phone: `+123456789${index}`,
  company: `Tech Company ${index}`,
  type: index % 2 === 0 ? 'Partner' : 'Customer',
  tags: index % 3 === 0 ? 'Red' : index % 3 === 1 ? 'Blue' : 'Green',
  imageUrl: '/images/avatar.png',
  userName:"user"
}));
