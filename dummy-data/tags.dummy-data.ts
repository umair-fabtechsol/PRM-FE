import { TagsType } from '@/types';
export const TAGS_LIST: TagsType[] = Array.from({ length: 5 }, (_, index) => ({
  id: `user-${index}`,
  name: `John Doe ${index}`,
  description: `	this is for the description part of this`,
  color: index % 3 === 0 ? 'Black' : index % 3 === 1 ? 'Blue' : 'Green',
}));
