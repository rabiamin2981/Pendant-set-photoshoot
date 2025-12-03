export enum LightingMode {
  STUDIO = 'Studio Soft Light',
  NATURAL = 'Natural Light',
  GOLDEN = 'Golden Tone',
  DRAMATIC = 'Dramatic Spotlight',
  RINGLIGHT = 'Ring Light',
}

export enum BackgroundOption {
  WHITE = 'White',
  MARBLE = 'Marble',
  VELVET = 'Velvet',
  WOOD = 'Wood',
  PLASTIC = 'Plastic',
  GLASS = 'Glass',
  CONCRETE = 'Concrete',
  SILK = 'Silk',
  BRUSHED_METAL = 'Brushed Metal',
}

export enum ImageCategory {
  FULL_SET = 'Full Set View',
  PENDANT_ONLY = 'Pendant Only View',
  TOPES_PAIR = 'Topes Pair View',
  PHOTOSHOOT = 'Realistic Photoshoot Render',
}

export enum StudioLightIntensity {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum NaturalLightTimeOfDay {
  MORNING = 'Morning',
  MIDDAY = 'Midday',
  EVENING = 'Evening',
}

export enum GoldenToneWarmth {
  SUBTLE = 'Subtle',
  MEDIUM = 'Medium',
  RICH = 'Rich',
}

export enum RingLightLightness {
  SOFT = 'Soft',
  BRIGHT = 'Bright',
  INTENSE = 'Intense',
}

export interface LightingDetails {
  studioIntensity: StudioLightIntensity;
  naturalTimeOfDay: NaturalLightTimeOfDay;
  goldenWarmth: GoldenToneWarmth;
  ringLightLightness: RingLightLightness;
}

export interface CustomizationOptions {
  background: BackgroundOption;
  customBackgroundColor: string;
  addModelHand: boolean;
  lighting: LightingMode;
  lightingDetails: LightingDetails;
}

export interface GeneratedImage {
  id: string;
  src: string;
  title: string;
  description: string;
}

export interface ImageCategoryConfig {
  id: ImageCategory;
  title: string;
  description: string;
  prompt: string;
}