import { TeamMemberType } from '@/types';
export const TEAMMEMBER_LIST: TeamMemberType[] = Array.from({ length: 5 }, (_, index) => ({
  id: `user-${index}`,
  name: `John Doe ${index}`,
  email: `johndoe${index}@example.com`,
  phone: `+123456789${index}`,
  tags: index % 3 === 0 ? 'Red' : index % 3 === 1 ? 'Blue' : 'Green',
  role: `Admin`,
  imageUrl: '/images/image.jpg',
  userName:"user"
}));
