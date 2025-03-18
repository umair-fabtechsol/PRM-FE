import { BillingType } from '@/types';
export const BILLING_LIST: BillingType[] = Array.from({ length: 5 }, (_, index) => ({
  id: `user-${index}`,
  name: `Basic Plan`,
  description: `lorem ipsum dolor sit amet`,
  trail: `10 Days`,
  frequency: 'Monthly',
  price: '$ 500',
  roles: `Role`,
}));
