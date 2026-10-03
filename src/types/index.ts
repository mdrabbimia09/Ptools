export type ToolCategory =
  | 'calculators'
  | 'converters'
  | 'text-tools'
  | 'encoding-decoding'
  | 'security'
  | 'developer-tools'
  | 'website-network'
  | 'url-link-tools'
  | 'seo-tools'
  | 'image-tools'
  | 'design-tools'
  | 'pdf-tools'
  | 'document-tools'
  | 'data-spreadsheet'
  | 'google-drive-cloud'
  | 'file-management'
  | 'audio-video'
  | 'social-media'
  | 'business'
  | 'education'
  | 'date-time'
  | 'archive-compression'
  | 'science-mathematics'
  | 'qr-barcode'
  | 'ai-tools'
  | 'cleanup-optimization'
  | 'translation-language'
  | 'device-utility';

export interface Category {
  id: ToolCategory;
  name: string;
  slug: string;
  description: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
  toolCount?: number;
}

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  icon: string;
  featured?: boolean;
  popular?: boolean;
  isNew?: boolean;
  status: 'active' | 'beta' | 'coming-soon';
  requiresApi?: boolean;
  implementationType?: 'client-side' | 'web-worker' | 'oauth' | 'external-api' | 'browser-api';
  apiDependency?: 'none' | 'google-oauth' | 'gemini-api' | 'browser-api' | 'server-required';
  lastTested?: string;
  howToUse: string[];
  features: string[];
  faqs: ToolFAQ[];
  relatedTools: string[]; // slugs of related tools
}

export type ThemeMode = 'light' | 'dark' | 'system';

export type AdPlacement =
  | 'home-top'
  | 'home-middle'
  | 'home-bottom'
  | 'category-top'
  | 'category-middle'
  | 'category-bottom'
  | 'tool-top'
  | 'tool-middle'
  | 'tool-bottom'
  | 'mobile'
  | 'desktop'
  // Legacy aliases
  | 'homeHeroBottom'
  | 'homeContentBetween'
  | 'categoryHeaderBottom'
  | 'toolPageTop'
  | 'toolPageBottom'
  | 'toolSidebar';

export type AdType = 'banner' | 'native' | 'social-bar' | 'direct-link';

export interface AdConfig {
  enableAds: boolean;
  enableDesktopAds: boolean;
  enableMobileAds: boolean;
  publisherId: string;
  bannerKey: string;
  nativeKey: string;
  socialBarKey: string;
  directLink: string;
  zones: Record<string, string>;
}
