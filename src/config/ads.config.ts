import { AdConfig, AdPlacement, AdType } from '../types';

/**
 * ============================================================================
 * PTools — Centralized Adsterra Advertising Configuration
 * ============================================================================
 * 
 * Instructions for Webmaster / Site Owner:
 * 1. To enable ads globally, set VITE_ADS_ENABLED="true" in your environment
 *    OR change `enableAds: true` below.
 * 2. Paste your real Adsterra public keys / Zone IDs below or into your .env:
 *    - Banner Key: 728x90, 300x250, 468x60, 160x600, 320x50
 *    - Native Key: Native banner zone key
 *    - Social Bar Key: Social bar script key
 *    - Direct Link: Direct smartlink URL
 * 
 * NOTE: Never commit sensitive private credentials. Adsterra zone keys are public
 * client-side invoke keys intended for frontend script embedding.
 */

// Helper to sanitize env values
const getEnv = (key: string, fallback: string = ''): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return String(import.meta.env[key]).trim();
  }
  return fallback;
};

const envAdsEnabled = getEnv('VITE_ADS_ENABLED', '').toLowerCase();
const isEnabledFromEnv = envAdsEnabled === 'true' || envAdsEnabled === '1';

export const adsConfig: AdConfig = {
  // Master switch - can be controlled via VITE_ADS_ENABLED environment variable
  enableAds: isEnabledFromEnv || false,
  
  // Device-level controls
  enableDesktopAds: true,
  enableMobileAds: true,

  // Adsterra Publisher ID (Optional, for reference or dashboard tracking)
  publisherId: getEnv('VITE_ADSTERRA_PUB_ID', ''),

  // Adsterra Script / Zone Keys (Obtain these from your Adsterra Publisher Dashboard)
  bannerKey: getEnv('VITE_ADSTERRA_BANNER_KEY', ''),
  nativeKey: getEnv('VITE_ADSTERRA_NATIVE_KEY', ''),
  socialBarKey: getEnv('VITE_ADSTERRA_SOCIAL_BAR_KEY', ''),
  directLink: getEnv('VITE_ADSTERRA_DIRECT_LINK', ''),

  // Zone IDs mapped by placement location
  zones: {
    // Standard placements
    'home-top': getEnv('VITE_ADSTERRA_ZONE_HOME_TOP', ''),
    'home-middle': getEnv('VITE_ADSTERRA_ZONE_HOME_MIDDLE', ''),
    'home-bottom': getEnv('VITE_ADSTERRA_ZONE_HOME_BOTTOM', ''),

    'category-top': getEnv('VITE_ADSTERRA_ZONE_CATEGORY_TOP', ''),
    'category-middle': getEnv('VITE_ADSTERRA_ZONE_CATEGORY_MIDDLE', ''),
    'category-bottom': getEnv('VITE_ADSTERRA_ZONE_CATEGORY_BOTTOM', ''),

    'tool-top': getEnv('VITE_ADSTERRA_ZONE_TOOL_TOP', ''),
    'tool-middle': getEnv('VITE_ADSTERRA_ZONE_TOOL_MIDDLE', ''),
    'tool-bottom': getEnv('VITE_ADSTERRA_ZONE_TOOL_BOTTOM', ''),

    'mobile': getEnv('VITE_ADSTERRA_ZONE_MOBILE', ''),
    'desktop': getEnv('VITE_ADSTERRA_ZONE_DESKTOP', ''),

    // Backward compatibility mappings for legacy camelCase
    homeHeroBottom: getEnv('VITE_ADSTERRA_ZONE_HOME_TOP', ''),
    homeContentBetween: getEnv('VITE_ADSTERRA_ZONE_HOME_MIDDLE', ''),
    categoryHeaderBottom: getEnv('VITE_ADSTERRA_ZONE_CATEGORY_TOP', ''),
    toolPageTop: getEnv('VITE_ADSTERRA_ZONE_TOOL_TOP', ''),
    toolPageBottom: getEnv('VITE_ADSTERRA_ZONE_TOOL_BOTTOM', ''),
    toolSidebar: getEnv('VITE_ADSTERRA_ZONE_SIDEBAR', ''),
  },
};

/**
 * Checks whether real Adsterra credentials have been configured
 */
export function hasRealCredentials(type: AdType = 'banner', placement?: string): boolean {
  if (type === 'banner') {
    if (adsConfig.bannerKey && !adsConfig.bannerKey.includes('PLACEHOLDER')) return true;
    if (placement && adsConfig.zones[placement] && !adsConfig.zones[placement].includes('PLACEHOLDER') && !adsConfig.zones[placement].includes('zone_')) return true;
    return false;
  }
  if (type === 'native') {
    return Boolean(adsConfig.nativeKey && !adsConfig.nativeKey.includes('PLACEHOLDER'));
  }
  if (type === 'social-bar') {
    return Boolean(adsConfig.socialBarKey && !adsConfig.socialBarKey.includes('PLACEHOLDER'));
  }
  if (type === 'direct-link') {
    return Boolean(adsConfig.directLink && !adsConfig.directLink.includes('PLACEHOLDER'));
  }
  return false;
}

/**
 * Resolves the Adsterra zone key for a given placement
 */
export function resolveZoneKey(placement: AdPlacement | string, type: AdType = 'banner'): string {
  // 1. Check placement-specific zone in config
  if (adsConfig.zones[placement]) {
    return adsConfig.zones[placement];
  }

  // 2. Fall back to generic banner/native keys
  if (type === 'banner') return adsConfig.bannerKey;
  if (type === 'native') return adsConfig.nativeKey;
  if (type === 'social-bar') return adsConfig.socialBarKey;
  return '';
}
