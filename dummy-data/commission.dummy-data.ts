import { CommissionType } from '@/types';
export const COMMISSION_LIST: CommissionType[] = Array.from({ length: 5 }, (_, index) => ({
  id: `user-${index}`,
  name: `John Doe ${index}`,
  description: `description${index}`,
  type: `monthly`,
  payout: `Stripe`,
  payment: `partner`,
  imageUrl: '/images/image.jpg',
}));
