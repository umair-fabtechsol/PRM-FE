import { CustomerType } from '@/types';
export const CUSTOMER_LIST: CustomerType[] = Array.from({ length: 5 }, (_, index) => ({
  id: `user-${index}`,
  name: `John Doe ${index}`,
  email: `johndoe${index}@example.com`,
  phone: `+123456789${index}`,
  plan: `Tech Company ${index}`,
  tags: index % 3 === 0 ? 'Red' : index % 3 === 1 ? 'Blue' : 'Green',
  imageUrl: '/images/image.jpg',
  userName:"jhon Doe"
}));
