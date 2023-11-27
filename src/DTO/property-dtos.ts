import { Decimal } from '@prisma/client/runtime/library';

export interface PropertyProps {
  id: string;
  category: string;
  title: string;
  address: string;
  price: Decimal;
  description: string;
  available: boolean;
  contractor?: string[]
  images?: string[];
}