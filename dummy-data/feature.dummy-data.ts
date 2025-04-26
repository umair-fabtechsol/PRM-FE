import { FeaureType } from '@/types';
export const FEATURE_LIST: FeaureType[] = Array.from({ length: 5 }, (_, index) => ({
  id: `user-${index}`,
  name: `Dummy Feature`,
  description: `lorem ipsum dolor sit amet`
}));
