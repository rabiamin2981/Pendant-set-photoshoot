import React, { useState, useEffect } from 'react';
import { CustomizationOptions, BackgroundOption, LightingMode, LightingDetails } from '../types';
import { BACKGROUND_OPTIONS, LIGHTING_MODES, STUDIO_INTENSITY_OPTIONS, NATURAL_TIME_OF_DAY_OPTIONS, GOLDEN_WARMTH_OPTIONS, RING_LIGHT_LIGHTNESS_OPTIONS } from '../constants';

interface ControlPanelProps {
  options: CustomizationOptions;
  setOptions: React.Dispatch<React.SetStateAction<CustomizationOptions>>;
  onGenerate: () => void;
  isLoading: boolean;
  isImageUploaded: boolean;
}

// Helper to convert hex to RGB object
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 255, g: 255, b: 255 }; // Default to white on failure
};

// Helper to convert a single RGB component to its hex representation
const componentToHex = (c: number): string => {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

// Helper to convert RGB object to hex string
const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};


const ControlPanel: React.FC<ControlPanelProps> = ({ options, setOptions, onGenerate, isLoading, isImageUploaded }) => {
  const [rgb, setRgb] = useState(hexToRgb(options.customBackgroundColor));

  useEffect(() => {
    // Sync local RGB state if prop changes from outside
    setRgb(hexToRgb(options.customBackgroundColor));
  }, [options.customBackgroundColor]);

  const handleOptionChange = <K extends keyof CustomizationOptions>(key: K, value: CustomizationOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleLightingDetailChange = <K extends keyof LightingDetails>(key: K, value: LightingDetails[K]) => {
    setOptions(prev => ({
      ...prev,
      lightingDetails: {
        ...prev.lightingDetails,
        [key]: value
      }
    }));
  };
  
  const handleBackgroundChange = (bgId: BackgroundOption) => {
    // If user selects 'White', also update the color picker to white.
    if (bgId === BackgroundOption.WHITE) {
        setOptions(prev => ({
            ...prev,
            background: bgId,
            customBackgroundColor: '#ffffff'
        }));
    } else {
        // For other backgrounds, just change the type and leave the color tint as is.
        setOptions(prev => ({ ...prev, background: bgId }));
    }
  };

  const handleRgbChange = (colorComponent: 'r' | 'g' | 'b', value: string) => {
    const numValue = Math.max(0, Math.min(255, parseInt(value, 10) || 0));
    const newRgb = { ...rgb, [colorComponent]: numValue };
    setRgb(newRgb);
    
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    
    // Update parent state with the new color
    setOptions(prev => ({
        ...prev,
        customBackgroundColor: newHex,
    }));
  };

  const renderLightingDetails = () => {
    switch(options.lighting) {
      case LightingMode.STUDIO:
        return (
          <div className="mt-3 bg-gray-700/50 p-3 rounded-md">
            <h4 className="text-sm font-semibold mb-2 text-gray-400">Intensity</h4>
            <div className="flex justify-between space-x-2">
              {STUDIO_INTENSITY_OPTIONS.map(opt => (
                <button key={opt.id} onClick={() => handleLightingDetailChange('studioIntensity', opt.id)} className={`flex-1 text-xs px-2 py-1 rounded ${options.lightingDetails.studioIntensity === opt.id ? 'bg-purple-600 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>{opt.label}</button>
              ))}
            </div>
          </div>
        )
      case LightingMode.NATURAL:
        return (
          <div className="mt-3 bg-gray-700/50 p-3 rounded-md">
            <h4 className="text-sm font-semibold mb-2 text-gray-400">Time of Day</h4>
            <div className="flex justify-between space-x-2">
              {NATURAL_TIME_OF_DAY_OPTIONS.map(opt => (
                <button key={opt.id} onClick={() => handleLightingDetailChange('naturalTimeOfDay', opt.id)} className={`flex-1 text-xs px-2 py-1 rounded ${options.lightingDetails.naturalTimeOfDay === opt.id ? 'bg-purple-600 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>{opt.label}</button>
              ))}
            </div>
          </div>
        )
      case LightingMode.GOLDEN:
        return (
          <div className="mt-3 bg-gray-700/50 p-3 rounded-md">
            <h4 className="text-sm font-semibold mb-2 text-gray-400">Warmth</h4>
            <div className="flex justify-between space-x-2">
              {GOLDEN_WARMTH_OPTIONS.map(opt => (
                <button key={opt.id} onClick={() => handleLightingDetailChange('goldenWarmth', opt.id)} className={`flex-1 text-xs px-2 py-1 rounded ${options.lightingDetails.goldenWarmth === opt.id ? 'bg-purple-600 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>{opt.label}</button>
              ))}
            </div>
          </div>
        )
      case LightingMode.RINGLIGHT:
        return (
          <div className="mt-3 bg-gray-700/50 p-3 rounded-md">
            <h4 className="text-sm font-semibold mb-2 text-gray-400">Lightness</h4>
            <div className="flex justify-between space-x-2">
              {RING_LIGHT_LIGHTNESS_OPTIONS.map(opt => (
                <button key={opt.id} onClick={() => handleLightingDetailChange('ringLightLightness', opt.id)} className={`flex-1 text-xs px-2 py-1 rounded ${options.lightingDetails.ringLightLightness === opt.id ? 'bg-purple-600 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>{opt.label}</button>
              ))}
            </div>
          </div>
        )
      default:
        return null;
    }
  }

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg flex flex-col space-y-6 h-full">
      <h2 className="text-2xl font-bold text-purple-400 border-b border-gray-700 pb-2">Customize Your Shot</h2>
      
      {/* Background Options */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-300">Background</h3>
        <div className="grid grid-cols-3 gap-2">
          {BACKGROUND_OPTIONS.map(bg => (
            <button
              key={bg.id}
              onClick={() => handleBackgroundChange(bg.id)}
              className={`px-3 py-2 text-sm rounded-md transition-all ${
                options.background === bg.id ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {bg.label}
            </button>
          ))}
        </div>
        <div className="mt-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Background Color / Tint
            </label>
            <div className="flex items-center bg-gray-700/50 rounded-md p-2 gap-3 border border-gray-700">
              <div className="w-10 h-10 rounded border-2 border-gray-500 flex-shrink-0" style={{ backgroundColor: options.customBackgroundColor }}></div>
              <div className="flex-grow grid grid-cols-3 gap-2">
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 font-bold text-red-400 pointer-events-none">R</span>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) => handleRgbChange('r', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded p-1 text-center pl-6"
                    aria-label="Red color value"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 font-bold text-green-400 pointer-events-none">G</span>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) => handleRgbChange('g', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded p-1 text-center pl-6"
                    aria-label="Green color value"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 font-bold text-blue-400 pointer-events-none">B</span>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) => handleRgbChange('b', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded p-1 text-center pl-6"
                    aria-label="Blue color value"
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
      
      {/* Lighting Mode */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-300">Lighting Mode</h3>
        <select
          value={options.lighting}
          onChange={e => handleOptionChange('lighting', e.target.value as LightingMode)}
          className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
        >
          {LIGHTING_MODES.map(mode => (
            <option key={mode.id} value={mode.id}>{mode.label}</option>
          ))}
        </select>
        {renderLightingDetails()}
      </div>

      {/* Add Model Hand */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-300">Display Style</h3>
        <label className="flex items-center justify-between bg-gray-700 p-3 rounded-md cursor-pointer">
          <span className="text-white">Add Model Hand View</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={options.addModelHand}
              onChange={e => handleOptionChange('addModelHand', e.target.checked)}
              className="sr-only peer"
            />
            <div className="block w-14 h-8 rounded-full transition-colors bg-gray-600 peer-checked:bg-purple-600"></div>
            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform peer-checked:translate-x-6"></div>
          </div>
        </label>
      </div>
      
      {/* Generate Button */}
      <div className="pt-4 mt-auto">
        <button
          onClick={onGenerate}
          disabled={isLoading || !isImageUploaded}
          className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/50"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating...</span>
            </>
          ) : (
            <span>Enhance Images</span>
          )}
        </button>
        {!isImageUploaded && <p className="text-center text-xs text-yellow-400 mt-2">Please upload an image first.</p>}
      </div>
    </div>
  );
};

export default ControlPanel;