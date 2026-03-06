// Common types for CCMartech

export interface NavLink {
  href: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  author?: string;
  thumbnail?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}
