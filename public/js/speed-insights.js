/**
 * Vercel Speed Insights initialization
 * This script injects Speed Insights to track web vitals and performance metrics
 */
import { injectSpeedInsights } from '../node_modules/@vercel/speed-insights/dist/index.mjs';

// Initialize Speed Insights
injectSpeedInsights({
  debug: false, // Set to true for development debugging
  sampleRate: 1, // Track 100% of page views
});
