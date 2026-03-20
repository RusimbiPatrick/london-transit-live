export function validateEnvironment(): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required environment variables
  if (!import.meta.env.VITE_TFL_APP_KEY) {
    errors.push('VITE_TFL_APP_KEY is required for TfL API access');
  } else if (import.meta.env.VITE_TFL_APP_KEY.length < 10) {
    warnings.push('VITE_TFL_APP_KEY appears to be too short');
  }

  // Check optional but recommended variables
  if (!import.meta.env.VITE_APP_NAME) {
    warnings.push('VITE_APP_NAME not set (optional)');
  }

  // Development-specific checks
  if (import.meta.env.DEV) {
    if (import.meta.env.VITE_TFL_APP_KEY && import.meta.env.VITE_TFL_APP_KEY.includes('example')) {
      warnings.push('Using example API key in development');
    }
  }

  // Production-specific checks
  if (import.meta.env.PROD) {
    if (import.meta.env.VITE_TFL_APP_KEY && import.meta.env.VITE_TFL_APP_KEY.length < 20) {
      warnings.push('Production API key should be longer');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function getApiConfig() {
  const validation = validateEnvironment();
  
  if (!validation.isValid) {
    throw new Error(`Environment validation failed: ${validation.errors.join(', ')}`);
  }

  return {
    appKey: import.meta.env.VITE_TFL_APP_KEY,
    baseUrl: import.meta.env.VITE_TFL_BASE_URL || 'https://api.tfl.gov.uk',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  };
}
