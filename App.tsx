import React, { useState, useCallback } from 'react';

// --- Type Definitions ---
enum BackgroundOption {
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

enum VelvetStyle {
  CLOTH = 'Cloth',
  STAND = 'Stand',
}

enum LightingMode {
  STUDIO = 'Studio',
  NATURAL = 'Natural',
  GOLDEN = 'Golden',
  DRAMATIC = 'Dramatic',
  RINGLIGHT = 'RingLight',
}

enum DisplayContext {
  STANDALONE = 'Standalone',
  HAND = 'On Model Hand',
  NECK = 'On Model Neck', 
}

enum StudioLightIntensity {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

enum NaturalLightTimeOfDay {
  MORNING = 'Morning',
  MIDDAY = 'Midday',
  EVENING = 'Evening',
}

enum GoldenToneWarmth {
  SUBTLE = 'Subtle',
  MEDIUM = 'Medium',
  RICH = 'Rich',
}

enum RingLightLightness {
  SOFT = 'Soft',
  BRIGHT = 'Bright',
  INTENSE = 'Intense',
}

enum ObjectProminence {
  SUBTLE = 'Subtle',
  BALANCED = 'Balanced',
  PROMINENT = 'Prominent',
}

enum ImageCategory {
  FULL_SET = 'FULL_SET',
  PENDANT_ONLY = 'PENDANT_ONLY',
  TOPES_PAIR = 'TOPES_PAIR',
  PHOTOSHOOT = 'PHOTOSHOOT',
}

interface LightingDetails {
  studioIntensity: StudioLightIntensity;
  naturalTimeOfDay: NaturalLightTimeOfDay;
  goldenWarmth: GoldenToneWarmth;
  ringLightLightness: RingLightLightness;
}

interface CustomizationOptions {
  background: BackgroundOption;
  backgroundTintHex: string; 
  velvetStyle: VelvetStyle;
  displayContext: DisplayContext;
  lighting: LightingMode;
  lightingDetails: LightingDetails;
  aestheticObjects: string[];
  objectProminence: ObjectProminence;
}

interface ImageCategoryConfig {
  id: ImageCategory;
  title: string;
  description: string;
  prompt: string;
}

interface GeneratedImage {
  id: ImageCategory;
  title: string;
  description: string;
  imageUrl: string;
}


// --- Constants ---

const BACKGROUND_OPTIONS: { id: BackgroundOption; label: string }[] = [
  { id: BackgroundOption.WHITE, label: 'Solid White/Color' },
  { id: BackgroundOption.MARBLE, label: 'Marble' },
  { id: BackgroundOption.VELVET, label: 'Velvet' },
  { id: BackgroundOption.WOOD, label: 'Wood' },
  { id: BackgroundOption.PLASTIC, label: 'Plastic' },
  { id: BackgroundOption.GLASS, label: 'Glass' },
  { id: BackgroundOption.CONCRETE, label: 'Concrete' },
  { id: BackgroundOption.SILK, label: 'Silk' },
  { id: BackgroundOption.BRUSHED_METAL, label: 'Brushed Metal' },
];

const VELVET_STYLE_OPTIONS: { id: VelvetStyle; label: string }[] = [
  { id: VelvetStyle.CLOTH, label: 'Draped Cloth' },
  { id: VelvetStyle.STAND, label: 'Display Bust/Stand' },
];

const LIGHTING_MODES: { id: LightingMode; label: string }[] = [
  { id: LightingMode.STUDIO, label: 'Studio Soft Light' },
  { id: LightingMode.NATURAL, label: 'Natural Light' },
  { id: LightingMode.GOLDEN, label: 'Golden Tone' },
  { id: LightingMode.DRAMATIC, label: 'Dramatic Spotlight' },
  { id: LightingMode.RINGLIGHT, label: 'Ring Light' },
];

const DISPLAY_CONTEXT_OPTIONS: { id: DisplayContext; label: string }[] = [
  { id: DisplayContext.STANDALONE, label: 'No Model (Standalone)' },
  { id: DisplayContext.HAND, label: 'On Hand Model' },
  { id: DisplayContext.NECK, label: 'On Neck Model' },
];

const STUDIO_INTENSITY_OPTIONS: { id: StudioLightIntensity; label: string }[] = [
  { id: StudioLightIntensity.LOW, label: 'Low' },
  { id: StudioLightIntensity.MEDIUM, label: 'Medium' },
  { id: StudioLightIntensity.HIGH, label: 'High' },
];

const NATURAL_LIGHT_TIME_OPTIONS: { id: NaturalLightTimeOfDay; label: string }[] = [
  { id: NaturalLightTimeOfDay.MORNING, label: 'Morning' },
  { id: NaturalLightTimeOfDay.MIDDAY, label: 'Midday' },
  { id: NaturalLightTimeOfDay.EVENING, label: 'Evening' },
];

const GOLDEN_TONE_OPTIONS: { id: GoldenToneWarmth; label: string }[] = [
  { id: GoldenToneWarmth.SUBTLE, label: 'Subtle' },
  { id: GoldenToneWarmth.MEDIUM, label: 'Medium' },
  { id: GoldenToneWarmth.RICH, label: 'Rich' },
];

const RING_LIGHT_OPTIONS: { id: RingLightLightness; label: string }[] = [
  { id: RingLightLightness.SOFT, label: 'Soft' },
  { id: RingLightLightness.BRIGHT, label: 'Bright' },
  { id: RingLightLightness.INTENSE, label: 'Intense' },
];

const OBJECT_PROMINENCE_OPTIONS: { id: ObjectProminence; label: string }[] = [
  { id: ObjectProminence.SUBTLE, label: 'Subtle' },
  { id: ObjectProminence.BALANCED, label: 'Balanced' },
  { id: ObjectProminence.PROMINENT, label: 'Prominent' },
];

const AESTHETIC_OBJECTS_CATEGORIES = [
  {
    name: "Nature & Organic",
    items: [
      "Rock (smooth)", "Leaf (autumn)", "Feather (downy)", "Flower (single petal)", "Driftwood",
      "Pinecone", "Twig", "Bird Nest (empty)", "Acorn", "Pod/Seed Husk",
      "Dried Grass", "Small Fern", "Thistle", "Dandelion puff", "Vine Tendril",
      "Berry Cluster", "Pebble", "Lichen", "Crystal Shard", "Mushroom (small)",
      "Moss Clump", "Air Plant", "Seashell (spiral)", "River Stone", "Cactus (small)"
    ]
  },
  {
    name: "Still Life & Ceramic",
    items: [
      "Plate (rimmed)", "Glass Bottle (empty)", "Wine Glass (empty)", "Small Box (wooden)", "Candle (taper, lit)",
      "Bowl (ceramic)", "Mug (stoneware)", "Spoon (antique)", "Bell Jar (empty)", "Matchbox",
      "Teacup (saucer)", "Jug/Pitcher", "Fork (silver)", "Hourglass", "Candlestick",
      "Mortar and Pestle", "Decanter", "Small Vase", "Basket (woven)", "Oil Lamp",
      "Small Sculpture", "Perfume Atomizer", "Inkwell", "Palette (artist's)", "Medicine Vial"
    ]
  },
  {
    name: "Paper & Written",
    items: [
      "Book (closed, old)", "Torn Paper", "Playing Card", "Tag/Label", "Loose Sheet Music",
      "Scroll (parchment)", "Wax Seal", "Stamp (postal)", "Dried Flower (pressed)", "Ruler (wooden)",
      "Quill Pen", "Ink Blot", "Sketch", "Charcoal Stick", "Pen Nib",
      "Letter (folded)", "Map (rolled)", "Receipt", "Compass (brass)", "Spectacles/Glasses",
      "Diary/Journal", "Ledger Book", "Bookmark", "Magnifying Glass", "Globe (miniature)"
    ]
  },
  {
    name: "Metal & Jewelry",
    items: [
      "Key (skeleton)", "Chain (delicate)", "Thimble", "Small Gear", "Metal Trinket",
      "Coin (aged)", "Safety Pin", "Crochet Hook", "Miniature Bell", "Nail/Screw",
      "Locket", "Ring (simple band)", "Needle/Thread", "Spool of Thread", "Pocket Knife",
      "Pin/Brooch", "Small Mirror", "Lock (small)", "Scissors (vintage)", "Button (mother-of-pearl)",
      "Pocket Watch", "Cufflink", "Safety Razor", "Whistle (metal)", "Barrette/Hairpin"
    ]
  }
];

const ALL_AESTHETIC_OBJECTS = AESTHETIC_OBJECTS_CATEGORIES.flatMap(c => c.items);


const IMAGE_CATEGORIES: ImageCategoryConfig[] = [
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
    prompt: `Generate a detailed close-up shot of the pendant from the provided jewelry set. The pendant should be the main focus, with part of the chain and the hook still visible. The camera angle should be a top-left angled view to highlight the depth of the design, metal texture, and gem sparkle.`
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


// --- Utility & Service Functions (Consolidated into App.tsx) ---

/**
 * Converts a HEX color string (e.g., #FF00AA) to an RGB description string (e.g., RGB(255, 0, 170)).
 */
const hexToRgbDescription = (hex: string): string => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `RGB(${r}, ${g}, ${b})`;
};

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000;

/**
 * Converts a File object (like an image) into a Base64 string suitable for the API payload.
 */
async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result as string;
            if (dataUrl) {
                // Extracts the base64 part after the comma
                resolve(dataUrl.split(',')[1]); 
            } else {
                 reject(new Error("Failed to read file as data URL."));
            }
        };
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

/**
 * Executes a fetch request with exponential backoff and retry logic.
 */
async function fetchWithRetry(apiUrl: string, payload: any, attempt = 1): Promise<any> {
    // Note: In a local React/Vite environment, the API key is loaded from .env.local 
    // and injected by Vite, so we leave it as an empty string in the code.
    const headers = { 'Content-Type': 'application/json' };
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`HTTP error! status: ${response.status}. Details: ${errorDetails.substring(0, 250)}`);
        }
        
        return await response.json();
    } catch (error) {
        if (attempt < MAX_RETRIES) {
            const delay = INITIAL_DELAY_MS * Math.pow(2, attempt - 1) + Math.random() * 500;
            // console.warn(`Retrying API call in ${delay.toFixed(0)}ms (Attempt ${attempt + 1}/${MAX_RETRIES})...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(apiUrl, payload, attempt + 1);
        } else {
            console.error(`Error: API failed after ${MAX_RETRIES} attempts. Last error:`, error);
            throw new Error(`API failed after ${MAX_RETRIES} attempts. Please check your API key and connection. Last error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}

/**
 * Calls the Gemini Image-to-Image model to enhance and customize the jewelry image.
 */
async function enhanceJewelryImage(
    originalImage: File,
    options: CustomizationOptions,
    categories: ImageCategoryConfig[]
): Promise<GeneratedImage[]> {
    // The apiKey is managed by the development environment (Vite)
    // IMPORTANT: The API key is sourced from the environment (e.g., VITE_GEMINI_API_KEY)
    // We use an empty string here to allow the environment to inject it if needed.
    const apiKey = ""; 

    const model = 'gemini-2.5-flash-image-preview'; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const base64Image = await fileToBase64(originalImage);

    const generatedResults: GeneratedImage[] = [];

    const baseSystemInstruction = `You are a professional jewelry photography and enhancement AI. Your task is to take the user-provided image of jewelry and render a new, hyper-realistic, high-resolution product photograph based on the user's instructions. The output image MUST be a professional-grade, photorealistic jewelry shot with brilliant shine, perfect focus, and luxurious texture. ALWAYS use the provided jewelry as the base for the generation.`;
    
    const colorDescription = hexToRgbDescription(options.backgroundTintHex);

    for (const category of categories) {
        let detailedPrompt = category.prompt;
        
        // Background Options
        const background = options.background;
        let backgroundInstruction = '';

        if (background === BackgroundOption.WHITE) {
            backgroundInstruction = `The background is a solid, non-reflective color matching the exact ${colorDescription}.`;
        } else if (background === BackgroundOption.VELVET) {
            let velvetDesc;
            if (options.velvetStyle === VelvetStyle.STAND) {
                // Determine the correct stand type based on the category
                if (category.id === ImageCategory.TOPES_PAIR) {
                    velvetDesc = "professional velvet earring display stand (T-bar or individual stud holder)";
                } else {
                    velvetDesc = "structured, professional velvet jewelry display bust";
                }
            } else {
                velvetDesc = "softly draped, luxurious velvet cloth with gentle folds";
            }
            backgroundInstruction = `Place the jewelry on a ${velvetDesc}, specifically tinted or shaded to match the color ${colorDescription}. The velvet texture must be visible and soft.`;
        } else {
            backgroundInstruction = `Place the jewelry on a background surface of polished, high-end ${background.toLowerCase().replace('_', ' ')} material, specifically tinted or shaded to match the color ${colorDescription}. The material texture must be visible.`;
        }
        
        detailedPrompt += ` ${backgroundInstruction}.`;

        // Lighting Details
        const lightingMode = options.lighting;
        detailedPrompt += ` The lighting style is highly professional and luxurious, specifically using the '${lightingMode}' technique.`;

        switch (lightingMode) {
            case LightingMode.STUDIO:
                detailedPrompt += ` Use a studio soft light setup with '${options.lightingDetails.studioIntensity}' intensity.`;
                break;
            case LightingMode.NATURAL:
                detailedPrompt += ` The natural light should represent '${options.lightingDetails.naturalTimeOfDay}' time of day, ensuring beautiful shadows and highlights.`;
                break;
            case LightingMode.GOLDEN:
                detailedPrompt += ` Apply a golden tone filter with a warmth level of '${options.lightingDetails.goldenWarmth}' for a soft, inviting glow.`;
                break;
            case LightingMode.RINGLIGHT:
                detailedPrompt += ` Use a ring light effect to create a circular reflection on the metal and gems, with a lightness of '${options.lightingDetails.ringLightLightness}'.`;
                break;
            default:
                break;
        }

        // Display Context Logic (Hand or Neck Model)
        const displayContext = options.displayContext;
        switch (displayContext) {
            case DisplayContext.HAND:
                detailedPrompt += ` The jewelry must be elegantly worn by a female model's hand, ensuring the hand placement is aesthetic and does not distract from the jewelry.`;
                break;
            case DisplayContext.NECK:
                detailedPrompt += ` The jewelry (specifically the pendant and chain) must be elegantly worn on a female model's neck and décolletage. The composition should be a close-up that focuses primarily on the necklace display.`;
                break;
            case DisplayContext.STANDALONE:
            default:
                detailedPrompt += ` The jewelry must be displayed as a standalone product shot without any human element.`;
                break;
        }

        // Aesthetic Objects
        if (options.aestheticObjects.length > 0) {
            const objectsString = options.aestheticObjects.join(', ');
            let prominenceInstruction = '';
            switch (options.objectProminence) {
                case ObjectProminence.SUBTLE:
                    prominenceInstruction = 'placed subtly in the background or periphery, slightly out of focus, adding texture without distracting from the jewelry';
                    break;
                case ObjectProminence.BALANCED:
                    prominenceInstruction = 'placed naturally within the scene to complement the jewelry composition';
                    break;
                case ObjectProminence.PROMINENT:
                    prominenceInstruction = 'placed prominently as part of the main composition, interacting with the jewelry to tell a story';
                    break;
            }
            detailedPrompt += ` To enhance the visual storytelling, include the following aesthetic props: ${objectsString}. These elements should be ${prominenceInstruction}.`;
        }
        
        detailedPrompt += ` Product Photography, 8K resolution, detailed, studio quality, sharp focus, cinematic lighting.`;


        const payload = {
            contents: [{
                parts: [
                    { text: detailedPrompt },
                    { 
                        inlineData: {
                            mimeType: originalImage.type.startsWith('image/') ? originalImage.type : 'image/png', 
                            data: base64Image 
                        } 
                    }
                ]
            }],
            generationConfig: {
                responseModalities: ['TEXT', 'IMAGE']
            },
            systemInstruction: {
                parts: [{ text: baseSystemInstruction }]
            }
        };

        try {
            const result = await fetchWithRetry(apiUrl, payload);
            const base64Data = result?.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData?.data;

            if (base64Data) {
                generatedResults.push({
                    id: category.id,
                    title: category.title,
                    description: category.description,
                    imageUrl: `data:image/png;base64,${base64Data}`,
                });
            } else {
                console.warn(`No image data received for category: ${category.title}`);
                generatedResults.push({
                    id: category.id,
                    title: category.title,
                    description: category.description,
                    imageUrl: `https://placehold.co/400x400/cc0000/ffffff?text=${encodeURIComponent('Generation Failed')}`,
                });
            }
        } catch (e) {
            console.error(`Failed to generate image for ${category.title}:`, e);
            // Re-throw to be caught by the main handler
            throw new Error(`Failed to generate image for ${category.title}. Please check the console for API error details.`);
        }
    }

    return generatedResults;
}


// --- Component Definitions (Consolidated into App.tsx) ---

interface SelectGroupProps<T> {
  label: string;
  options: { id: T; label: string }[];
  selectedValue: T;
  onChange: (value: T) => void;
}

const SelectGroup = <T extends string>({ label, options, selectedValue, onChange }: SelectGroupProps<T>) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-300 block">{label}</label>
    <div className="grid grid-cols-3 gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 ${
            selectedValue === option.id
              ? 'bg-pink-600 text-white shadow-md ring-2 ring-pink-400'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);


interface ContextToggleGroupProps {
    selectedValue: DisplayContext;
    onChange: (value: DisplayContext) => void;
}

const ContextToggleGroup: React.FC<ContextToggleGroupProps> = ({ selectedValue, onChange }) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 block">Jewelry Display Context (Model)</label>
        <div className="grid grid-cols-3 gap-2 p-1 bg-gray-700 rounded-xl shadow-inner border border-gray-600">
            {DISPLAY_CONTEXT_OPTIONS.map((option) => (
                <button
                    key={option.id}
                    onClick={() => onChange(option.id)}
                    className={`
                        px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200
                        ${
                            selectedValue === option.id
                                ? 'bg-pink-600 text-white shadow-lg shadow-pink-900/50 ring-2 ring-pink-400'
                                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/80'
                        }
                    `}
                >
                    {option.label}
                </button>
            ))}
        </div>
    </div>
);


interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  originalImage: File | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, originalImage }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const imageUrl = originalImage ? URL.createObjectURL(originalImage) : null;

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-purple-600/50 rounded-xl hover:border-purple-500 transition-colors cursor-pointer min-h-[150px]">
      <input
        type="file"
        id="image-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <label htmlFor="image-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
        {imageUrl ? (
          <div className="flex flex-col items-center">
            <img src={imageUrl} alt="Original Upload" className="w-24 h-24 object-contain rounded-lg mb-4 shadow-lg border border-gray-600" />
            <p className="text-purple-400 font-medium truncate w-full text-center">{originalImage?.name}</p>
            <p className="text-sm text-gray-400 mt-2">Click to replace image</p>
          </div>
        ) : (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="mt-1 text-sm text-gray-400">Drag and drop or click to <span className="text-purple-300 font-semibold">upload jewelry photo</span></p>
            <p className="text-xs text-gray-500 mt-1">(Pendant set recommended, square crop preferred)</p>
          </div>
        )}
      </label>
    </div>
  );
};

interface ImageGalleryProps {
  images: GeneratedImage[];
  isLoading: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-4">
        <svg className="animate-spin h-10 w-10 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-400 text-lg font-semibold">AI is crafting 4 professional shots...</p>
        <p className="text-sm text-gray-500">This may take 30-60 seconds.</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <p className="text-gray-500 text-center p-4">
          Upload an image, select your options, and click 'Generate' to see the enhanced results here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {images.map((image) => (
        <div key={image.id} className="bg-gray-700 rounded-xl overflow-hidden shadow-xl group transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
          <div className="relative aspect-square">
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <a
              href={image.imageUrl}
              download={`${image.title.replace(/\s/g, '-')}-AI-Enhanced.png`}
              className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-pink-600"
              title="Download Image"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <div className="p-4 bg-gray-700">
            <h3 className="text-lg font-semibold text-purple-300">{image.title}</h3>
            <p className="text-sm text-gray-400 mt-1">{image.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

interface ControlPanelProps {
    options: CustomizationOptions;
    setOptions: React.Dispatch<React.SetStateAction<CustomizationOptions>>;
    onGenerate: () => void;
    isLoading: boolean;
    isImageUploaded: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ options, setOptions, onGenerate, isLoading, isImageUploaded }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (key: keyof CustomizationOptions, value: any) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleLightingDetailChange = (key: keyof LightingDetails, value: any) => {
    setOptions(prev => ({
      ...prev,
      lightingDetails: {
        ...prev.lightingDetails,
        [key]: value,
      }
    }));
  };

  const toggleObject = (objectName: string) => {
    setOptions(prev => {
      const current = prev.aestheticObjects;
      if (current.includes(objectName)) {
        return { ...prev, aestheticObjects: current.filter(item => item !== objectName) };
      } else {
        return { ...prev, aestheticObjects: [...current, objectName] };
      }
    });
  };

  const randomizeObjects = () => {
    const count = Math.random() > 0.5 ? 2 : 1;
    const shuffled = [...ALL_AESTHETIC_OBJECTS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    handleChange('aestheticObjects', selected);
  };

  const renderLightingDetails = (mode: LightingMode) => {
    switch (mode) {
      case LightingMode.STUDIO:
        return (
          <SelectGroup<StudioLightIntensity>
            label="Studio Intensity"
            options={STUDIO_INTENSITY_OPTIONS}
            selectedValue={options.lightingDetails.studioIntensity}
            onChange={(val) => handleLightingDetailChange('studioIntensity', val)}
          />
        );
      case LightingMode.NATURAL:
        return (
          <SelectGroup<NaturalLightTimeOfDay>
            label="Time of Day"
            options={NATURAL_LIGHT_TIME_OPTIONS}
            selectedValue={options.lightingDetails.naturalTimeOfDay}
            onChange={(val) => handleLightingDetailChange('naturalTimeOfDay', val)}
          />
        );
      case LightingMode.GOLDEN:
        return (
          <SelectGroup<GoldenToneWarmth>
            label="Warmth Level"
            options={GOLDEN_TONE_OPTIONS}
            selectedValue={options.lightingDetails.goldenWarmth}
            onChange={(val) => handleLightingDetailChange('goldenWarmth', val)}
          />
        );
      case LightingMode.RINGLIGHT:
        return (
          <SelectGroup<RingLightLightness>
            label="Lightness"
            options={RING_LIGHT_OPTIONS}
            selectedValue={options.lightingDetails.ringLightLightness}
            onChange={(val) => handleLightingDetailChange('ringLightLightness', val)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl shadow-xl sticky top-4 border border-purple-500/30">
      <h2 className="text-2xl font-bold text-pink-400 mb-6">Customization Options</h2>

      <div className="space-y-6">
        {/* Background Select */}
        <SelectGroup<BackgroundOption>
          label="Background Material/Color"
          options={BACKGROUND_OPTIONS}
          selectedValue={options.background}
          onChange={(val) => handleChange('background', val)}
        />
        
        {/* Velvet Sub-option */}
        {options.background === BackgroundOption.VELVET && (
             <div className="mt-2 pl-2 border-l-2 border-purple-500/50 animate-fadeIn">
                <SelectGroup<VelvetStyle>
                    label="Velvet Display Style"
                    options={VELVET_STYLE_OPTIONS}
                    selectedValue={options.velvetStyle}
                    onChange={(val) => handleChange('velvetStyle', val)}
                />
            </div>
        )}

        {/* Background Tint/Color Input */}
        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
          <label className="text-sm font-medium text-gray-300">
            Background Tint/Color (HEX) 
            <span className='block text-xs text-gray-400'>Sets solid color or tints the material.</span>
          </label>
          <input
            type="color"
            value={options.backgroundTintHex}
            onChange={(e) => handleChange('backgroundTintHex', e.target.value)}
            className="w-8 h-8 rounded-full border-none cursor-pointer p-0"
            style={{ padding: '0px' }}
          />
        </div>

        {/* Display Context Select - Uses the new ContextToggleGroup */}
        <ContextToggleGroup
            selectedValue={options.displayContext}
            onChange={(val) => handleChange('displayContext', val)}
        />
        
        {/* Aesthetic Objects Section */}
        <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-300">Aesthetic Object</label>
                <button 
                  onClick={randomizeObjects}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Randomize
                </button>
            </div>
            
            <input 
              type="text" 
              placeholder="Search objects (e.g. Flower, Ribbon)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-700 text-sm text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 mb-2"
            />

            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-2 max-h-48 overflow-y-auto">
               {searchQuery ? (
                   // Flattened list when searching
                   <div className="grid grid-cols-2 gap-2">
                       {ALL_AESTHETIC_OBJECTS.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
                           <button
                             key={item}
                             onClick={() => toggleObject(item)}
                             className={`px-2 py-1.5 text-xs text-left rounded truncate transition-colors ${
                               options.aestheticObjects.includes(item)
                                 ? 'bg-purple-600 text-white'
                                 : 'bg-gray-800 text-gray-400 hover:bg-gray-600'
                             }`}
                           >
                               {item}
                           </button>
                       ))}
                       {ALL_AESTHETIC_OBJECTS.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                           <p className="col-span-2 text-xs text-center text-gray-500 py-2">No matching objects found.</p>
                       )}
                   </div>
               ) : (
                   // Categorized list when not searching
                   <div className="space-y-3">
                       {AESTHETIC_OBJECTS_CATEGORIES.map((category) => (
                           <div key={category.name}>
                               <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5 ml-1">{category.name}</h4>
                               <div className="grid grid-cols-2 gap-2">
                                   {category.items.map(item => (
                                       <button
                                         key={item}
                                         onClick={() => toggleObject(item)}
                                         className={`px-2 py-1.5 text-xs text-left rounded truncate transition-colors ${
                                           options.aestheticObjects.includes(item)
                                             ? 'bg-purple-600 text-white'
                                             : 'bg-gray-800 text-gray-400 hover:bg-gray-600'
                                         }`}
                                       >
                                           {item}
                                       </button>
                                   ))}
                               </div>
                           </div>
                       ))}
                   </div>
               )}
            </div>

            {/* Object Prominence Slider/Selector */}
            {options.aestheticObjects.length > 0 && (
                <div className="mt-3 pt-2 border-t border-gray-700 animate-fadeIn">
                     <SelectGroup<ObjectProminence>
                        label="Object Prominence"
                        options={OBJECT_PROMINENCE_OPTIONS}
                        selectedValue={options.objectProminence}
                        onChange={(val) => handleChange('objectProminence', val)}
                      />
                </div>
            )}
        </div>


        {/* Lighting Mode Select */}
        <SelectGroup<LightingMode>
          label="Lighting Style"
          options={LIGHTING_MODES}
          selectedValue={options.lighting}
          onChange={(val) => handleChange('lighting', val)}
        />

        {/* Lighting Details (Conditional) */}
        {renderLightingDetails(options.lighting)}

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={isLoading || !isImageUploaded}
          className={`w-full py-3 rounded-lg text-lg font-bold transition-all duration-300 ${
            isLoading || !isImageUploaded
              ? 'bg-gray-600 cursor-not-allowed text-gray-400'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-900/50 text-white transform hover:scale-[1.02]'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating 4 Images...
            </div>
          ) : (
            'Generate Enhanced Images'
          )}
        </button>
      </div>
    </div>
  );
};


// --- Main App Component ---

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Set initial state with the new DisplayContext enum
  const [customizationOptions, setCustomizationOptions] = useState<CustomizationOptions>({
    background: BackgroundOption.VELVET, // Set a default other than White to match screenshot
    backgroundTintHex: '#800000', // Set a default dark red tint
    velvetStyle: VelvetStyle.CLOTH,
    displayContext: DisplayContext.STANDALONE,
    lighting: LightingMode.NATURAL, // Set a default natural light
    lightingDetails: {
      studioIntensity: StudioLightIntensity.MEDIUM,
      naturalTimeOfDay: NaturalLightTimeOfDay.MIDDAY,
      goldenWarmth: GoldenToneWarmth.MEDIUM,
      ringLightLightness: RingLightLightness.BRIGHT,
    },
    aestheticObjects: [],
    objectProminence: ObjectProminence.BALANCED,
  });

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setGeneratedImages([]);
    setError(null);
  };

  const handleGenerateImages = useCallback(async () => {
    if (!originalImage) {
      setError('Please upload an image first.');
      return;
    }
    
    // Clear previous results/errors
    setError(null);
    setIsLoading(true);

    try {
      const results = await enhanceJewelryImage(
        originalImage, 
        customizationOptions,
        IMAGE_CATEGORIES 
      );
      setGeneratedImages(results);
    } catch (e) {
      console.error(e);
      // Ensure the error message is user-friendly
      const errorMessage = e instanceof Error 
        ? (e.message.includes('401') 
            ? 'Generation failed: Unauthorized (401). Please ensure your API key is correctly configured.'
            : e.message)
        : 'An unknown error occurred during image generation.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, customizationOptions]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-900 text-gray-100 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Jewelry AI Enhancer
            </span>
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Transform your jewelry photos into professional product shots with AI.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="lg:col-span-1">
            <ControlPanel 
              options={customizationOptions}
              setOptions={setCustomizationOptions}
              onGenerate={handleGenerateImages}
              isLoading={isLoading}
              isImageUploaded={!!originalImage}
            />
          </aside>

          <section className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-purple-500/30">
                <h2 className="text-2xl font-bold text-purple-400 mb-4">1. Upload Your Image</h2>
                <ImageUpload onImageUpload={handleImageUpload} originalImage={originalImage}/>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg min-h-[400px] border border-pink-500/30">
                <h2 className="text-2xl font-bold text-purple-400 mb-4">2. Generated Results</h2>
                {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-md mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    {error}
                </div>}
                <ImageGallery images={generatedImages} isLoading={isLoading}/>
            </div>
          </section>
        </main>
      </div>
      <footer className="text-center mt-10 text-gray-500 text-sm">
        <p>AI Enhancement powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;