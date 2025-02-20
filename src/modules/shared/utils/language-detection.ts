/**
 * Language detection utility for the glossary search
 */
export function detectLanguage(text: string) {
  // Sinhala Unicode range: \u0D80-\u0DFF
  const sinhalaPattern = /[\u0D80-\u0DFF]/;

  // Tamil Unicode range: \u0B80-\u0BFF
  const tamilPattern = /[\u0B80-\u0BFF]/;

  // English pattern (basic Latin alphabet)
  const englishPattern = /^[A-Z\s]+$/i;

  if (sinhalaPattern.test(text)) {
    return "sinhala";
  }
  if (tamilPattern.test(text)) {
    return "tamil";
  }
  if (englishPattern.test(text)) {
    return "english";
  }

  return "unknown";
}
