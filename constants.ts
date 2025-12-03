import { BackgroundOption, ImageCategory, ImageCategoryConfig, LightingMode, StudioLightIntensity, NaturalLightTimeOfDay, GoldenToneWarmth, RingLightLightness } from './types';

export const BACKGROUND_OPTIONS: { id: BackgroundOption; label: string }[] = [
  { id: BackgroundOption.WHITE, label: 'White' },
  { id: BackgroundOption.MARBLE, label: 'Marble' },
  { id: BackgroundOption.VELVET, label: 'Velvet' },
  { id: BackgroundOption.WOOD, label: 'Wood' },
  { id: BackgroundOption.PLASTIC, label: 'Plastic' },
  { id: BackgroundOption.GLASS, label: 'Glass' },
  { id: BackgroundOption.CONCRETE, label: 'Concrete' },
  { id: BackgroundOption.SILK, label: 'Silk' },
  { id: BackgroundOption.BRUSHED_METAL, label: 'Brushed Metal' },
];

export const LIGHTING_MODES: { id: LightingMode; label: string }[] = [
  { id: LightingMode.STUDIO, label: 'Studio Soft Light' },
  { id: LightingMode.NATURAL, label: 'Natural Light' },
  { id: LightingMode.GOLDEN, label: 'Golden Tone' },
  { id: LightingMode.DRAMATIC, label: 'Dramatic Spotlight' },
  { id: LightingMode.RINGLIGHT, label: 'Ring Light' },
];

export const STUDIO_INTENSITY_OPTIONS: { id: StudioLightIntensity; label: string }[] = [
  { id: StudioLightIntensity.LOW, label: 'Low' },
  { id: StudioLightIntensity.MEDIUM, label: 'Medium' },
  { id: StudioLightIntensity.HIGH, label: 'High' },
];

export const NATURAL_TIME_OF_DAY_OPTIONS: { id: NaturalLightTimeOfDay; label: string }[] = [
  { id: NaturalLightTimeOfDay.MORNING, label: 'Morning' },
  { id: NaturalLightTimeOfDay.MIDDAY, label: 'Midday' },
  { id: NaturalLightTimeOfDay.EVENING, label: 'Evening' },
];

export const GOLDEN_WARMTH_OPTIONS: { id: GoldenToneWarmth; label: string }[] = [
  { id: GoldenToneWarmth.SUBTLE, label: 'Subtle' },
  { id: GoldenToneWarmth.MEDIUM, label: 'Medium' },
  { id: GoldenToneWarmth.RICH, label: 'Rich' },
];

export const RING_LIGHT_LIGHTNESS_OPTIONS: { id: RingLightLightness; label: string }[] = [
  { id: RingLightLightness.SOFT, label: 'Soft' },
  { id: RingLightLightness.BRIGHT, label: 'Bright' },
  { id: RingLightLightness.INTENSE, label: 'Intense' },
];


export const IMAGE_CATEGORIES: ImageCategoryConfig[] = [
  {
    id: ImageCategory.FULL_SET,
    title: 'Full Set View',
    description: 'The complete pendant set in a professional product shot.',
    prompt: `Generate a high-resolution, professional e-commerce product photograph of the complete jewelry set provided in the image. The set includes a pendant, chain, and earrings. The final image should be a front display view, perfectly centered. Ensure the design is crystal clear and the metal has a realistic shine. This is a catalog-style look for eCommerce listings.`,
  },
  {
    id: ImageCategory.PENDANT_ONLY,
    title: 'Pendant Only View',
    description: 'A focused view on a single pendant.',
    prompt: `Generate a detailed close-up shot of the pendant from the provided jewelry set. The pendant should be the main focus, with part of the chain and the hook still visible. The camera angle should be a top-left angled view to highlight the depth of the design, metal texture, and gem sparkle.`,
  },
  {
    id: ImageCategory.TOPES_PAIR,
    title: 'Topes Pair View',
    description: 'Both earrings displayed side by side.',
    prompt: `Generate a professional product shot displaying both earrings (topes) from the provided set, side-by-side in a symmetrical arrangement. Use a top-down camera view to clearly show the gem pattern and full design layout of each earring.`,
  },
  {
    id: ImageCategory.PHOTOSHOOT,
    title: 'Realistic Photoshoot',
    description: 'A professional render with realistic lighting and shine.',
    prompt: `Create a hyper-realistic, professional jewelry photoshoot render based on the provided jewelry set. The final image should have a strong sense of realism, with sophisticated lighting that creates beautiful reflections and a brilliant shine on the metal and gems. The composition should be artistic and visually appealing. The jewelry should look luxurious and desirable.`,
  },
];