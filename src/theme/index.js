// src/theme/index.js
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

/**
 * CHAKRA UI THEME SYSTEM
 * 
 * Currently using defaultSystem as the base.
 * 
 * TO CUSTOMIZE:
 * 1. Add your tokens to the customConfig object below
 * 2. The system will merge them with defaultConfig
 * 
 * Example customization:
 * tokens: {
 *   colors: {
 *     brand: { 
 *       500: { value: "#your-color" }
 *     }
 *   }
 * }
 */

const customConfig = defineConfig({
  theme: {
    // 👇 Add your customizations here when ready
    tokens: {},
    semanticTokens: {},
  },
});

// Merge default and custom configurations
export const system = createSystem(defaultConfig, customConfig);