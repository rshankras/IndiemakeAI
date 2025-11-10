
export enum AppView {
  LANDING = 'landing',
  WIZARD = 'wizard',
  GENERATING = 'generating',
  RESULTS = 'results',
  HISTORY = 'history',
}

export enum AppCategory {
  MEDITATION = 'Meditation',
  HEALTH = 'Health',
  PRODUCTIVITY = 'Productivity',
  SOCIAL = 'Social',
  TRAVEL = 'Travel',
  FINANCE = 'Finance',
  EDUCATION = 'Education',
  OTHER = 'Other',
}

export enum Audience {
    STUDENTS = 'Students',
    YOUNG_ADULTS = 'Young Adults',
    PROFESSIONALS = 'Professionals',
    TRAVELERS = 'Travelers',
    HEALTH_CONSCIOUS = 'Health-Conscious',
    PARENTS = 'Parents',
    GAMERS = 'Gamers',
}

export enum ContentTone {
    ASPIRATIONAL = 'Aspirational',
    RELATABLE = 'Relatable',
    PROFESSIONAL = 'Professional',
    CASUAL = 'Casual',
    HUMOROUS = 'Humorous',
}

export enum VisualStyle {
    TRAVEL_INFLUENCER = 'Travel Influencer',
    LIFESTYLE = 'Lifestyle',
    PROFESSIONAL = 'Professional',
    MINIMALIST = 'Minimalist',
    PRODUCT_FOCUSED = 'Product-Focused',
}

export enum TargetPlatform {
    INSTAGRAM = 'Instagram',
    TWITTER = 'Twitter / X',
    REDDIT = 'Reddit',
    YOUTUBE = 'YouTube',
    LINKEDIN = 'LinkedIn',
}

export type CampaignData = {
  appName: string;
  appCategory: AppCategory;
  keyFeatures: string;
  appStoreLink?: string;
  primaryAudience: Audience[];
  uniqueness: string;
  competitors?: string;
  contentTone: ContentTone;
  visualStyle: VisualStyle;
  targetPlatforms: TargetPlatform[];
  campaignLength: 7 | 14 | 30;
};

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
}

export interface Caption {
    id: string;
    text: string;
}

export interface HashtagSet {
    useCase: string;
    hashtags: string[];
}

export interface CampaignDay {
    day: number;
    date: string;
    postType: string;
    captionPreview: string;
    imagePreviewUrl: string;
    bestTimeToPost: string;
}

export interface GeneratedContent {
    id?: string;
    savedAt?: string;
    appName: string;
    images: GeneratedImage[];
    captions: Caption[];
    hashtagSets: HashtagSet[];
    campaignPlan: CampaignDay[];
    quickReferenceGuide: string; // Markdown content
    promptLibrary: Record<string, any>; // JSON content
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}
