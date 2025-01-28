export type PartnerType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  type: 'Partner' | 'Customer';
  tags: 'Red' | 'Blue' | 'Green';
  imageUrl: string;
};
