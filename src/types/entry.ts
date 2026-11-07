export type Entry = {
  id: string; // crypto.randomUUID()
  companyName: string;
  contactName: string;
  role: string;
  type: 'card' | 'brochure' | 'both';
  cardImageUrl?: string; // base64 (MVP) or Supabase Storage URL
  brochureFileUrl?: string;
  notes: string;
  createdAt: string; // ISO date string
  updatedAt: string;
};

export type Filter = 'all' | 'card' | 'brochure' | 'both';
