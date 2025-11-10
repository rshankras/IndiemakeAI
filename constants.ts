
import { CampaignData, AppCategory, Audience, ContentTone, VisualStyle, TargetPlatform } from './types';

export const APP_CATEGORIES = Object.values(AppCategory);
export const AUDIENCE_OPTIONS = Object.values(Audience);
export const CONTENT_TONES = Object.values(ContentTone);
export const VISUAL_STYLES = Object.values(VisualStyle);
export const TARGET_PLATFORMS = Object.values(TargetPlatform);

export const DEFAULT_CAMPAIGN_DATA: CampaignData = {
  appName: '',
  appCategory: AppCategory.PRODUCTIVITY,
  keyFeatures: '- Feature 1\n- Feature 2\n- Feature 3',
  appStoreLink: '',
  primaryAudience: [],
  uniqueness: '',
  competitors: '',
  contentTone: ContentTone.RELATABLE,
  visualStyle: VisualStyle.LIFESTYLE,
  targetPlatforms: [TargetPlatform.INSTAGRAM, TargetPlatform.TWITTER],
  campaignLength: 14,
};
