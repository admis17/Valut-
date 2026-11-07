export type Entry = {
  id: string; // crypto.randomUUID()
  companyName: string;
  contactName: string;
  role: string;
  type: 'card' | 'brochure' | 'both';
  cardFrontUrl?: string; // front scan (image)
  cardBackUrl?: string; // back scan (image)
  cardDocUrl?: string; // attached document for the card (pdf/docx/xlsx/csv…)
  brochureFileUrl?: string;
  industry?: string; // tag used for dashboard industry bars
  notes: string;
  createdAt: string; // ISO date string
  updatedAt: string;
};

export type Filter = 'all' | 'card' | 'brochure' | 'both';
