export interface CardModel {
  id: number
  cardType: 'product' | 'category' | 'service' | 'testimonial';
  title: string;
  subtitle?: string;
  brand?: string
  brandLogo?: string
  verified?: boolean
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  featured?: boolean;
  attributes?: any
  onSale?: boolean;
  price?: number;
  originalPrice?: number;
  priceUnit?: string;
  rating?: number;
  reviewCount?: number;
  specs?: string[]; // For product specifications
  tags?: string[];
  linkText?: string;
  linkUrl?: string;
}