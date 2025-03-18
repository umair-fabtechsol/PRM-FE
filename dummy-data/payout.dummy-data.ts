import { PayoutType } from '@/types';
export const PAYOUT_LIST: PayoutType[] = Array.from({ length: 5 }, (_, index) => ({
  id: `user-${index}`,
  name: `John Doe ${index}`,
  amount: 16778,
  date: `monthly`,
  payout: `Stripe`,
  payment: `partner`,
}));
