import { GoogleGenAI, Modality } from "@google/genai";
import { CustomizationOptions, ImageCategoryConfig, BackgroundOption, LightingMode, StudioLightIntensity, NaturalLightTimeOfDay, GoldenToneWarmth, RingLightLightness } from '../types';

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        resolve('');
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const buildPrompt = (categoryConfig: ImageCategoryConfig, options: CustomizationOptions): string => {
  let prompt = categoryConfig.prompt;

  // Background
  let backgroundPrompt: string;
  // If the background is 'White', treat it as a solid color that can be customized.
  // This allows the user to click 'White' then use the RGB picker for an off-white, for example.
  if (options.background === BackgroundOption.WHITE) {
    backgroundPrompt = `a solid color background with the hex code ${options.customBackgroundColor}`;
  } else {
    // For textured backgrounds, use the selected color as a tint.
    backgroundPrompt = `a ${options.background.toLowerCase()} background, tinted with the color ${options.customBackgroundColor}`;
  }
  prompt += ` The background should be ${backgroundPrompt}.`;

  // Lighting
  let lightingPrompt: string;
  switch (options.lighting) {
    case LightingMode.NATURAL:
      const timeOfDayDesc = {
        [NaturalLightTimeOfDay.MORNING]: "bright, crisp morning sun",
        [NaturalLightTimeOfDay.MIDDAY]: "powerful, direct midday sun",
        [NaturalLightTimeOfDay.EVENING]: "soft, gentle evening light",
      }[options.lightingDetails.naturalTimeOfDay];
      lightingPrompt = `bright, vibrant natural light, as if shot outdoors in the ${timeOfDayDesc}`;
      break;
    case LightingMode.GOLDEN:
       const warmthDesc = {
        [GoldenToneWarmth.SUBTLE]: "a subtle hint of warmth",
        [GoldenToneWarmth.MEDIUM]: "a clear, warm glow",
        [GoldenToneWarmth.RICH]: "a deep, rich golden hue",
      }[options.lightingDetails.goldenWarmth];
      lightingPrompt = `warm, golden hour lighting that enhances the richness of the metal with ${warmthDesc}`;
      break;
    case LightingMode.DRAMATIC:
      lightingPrompt = "a single, hard-edged dramatic spotlight from above, creating high contrast, deep shadows, and a focused, luxurious feel";
      break;
    case LightingMode.RINGLIGHT:
       const lightnessDesc = {
        [RingLightLightness.SOFT]: "soft and diffused",
        [RingLightLightness.BRIGHT]: "bright and clear",
        [RingLightLightness.INTENSE]: "very bright and intense",
      }[options.lightingDetails.ringLightLightness];
      lightingPrompt = `a clean, modern ring light setup, creating a ${lightnessDesc}, shadowless look with a characteristic circular reflection on reflective surfaces`;
      break;
    case LightingMode.STUDIO:
    default:
      const intensityDesc = {
          [StudioLightIntensity.LOW]: "low intensity",
          [StudioLightIntensity.MEDIUM]: "perfectly balanced medium intensity",
          [StudioLightIntensity.HIGH]: "bright, high intensity",
      }[options.lightingDetails.studioIntensity];
      lightingPrompt = `diffused, even studio softbox lighting with ${intensityDesc} that eliminates harsh shadows and highlights every detail`;
      break;
  }
  prompt += ` The lighting should be ${lightingPrompt}.`;

  // Model Hand
  if (options.addModelHand) {
    prompt += ` The jewelry should be displayed on or held by a photorealistic model's hand to show scale and context.`;
  }
  
  prompt += ` Do not include any text or watermarks in the generated image.`;

  return prompt;
};

export const enhanceJewelryImage = async (
  imageFile: File,
  options: CustomizationOptions,
  categoryConfig: ImageCategoryConfig
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key not found. Please set the API_KEY environment variable.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const imagePart = await fileToGenerativePart(imageFile);
  const textPrompt = buildPrompt(categoryConfig, options);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          imagePart,
          { text: textPrompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in the API response.");
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate image. Please check the console for details.");
  }
};