export interface Category {
  id: number;
  name: string;
  route: string;
}

export type CategoryName = 'funFact' | 'scienceFact' | 'quoteOfDay' | 'thisDayHistory' | 'questionOfDay';
export type CategoryRoute = 'fanFact' | 'scienceFact' | 'dayQuote' | 'dayEvent' | 'dayQuestion'; 