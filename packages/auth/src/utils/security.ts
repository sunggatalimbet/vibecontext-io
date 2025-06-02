/**
 * @file: security.ts
 * @description: Security utility functions for the auth package
 * @created: 2025-01-06
 */

/**
 * Validates redirect URLs to prevent open redirect vulnerabilities
 * Only allows same-origin redirects
 *
 * @param url - The URL to validate (can be null)
 * @param origin - The allowed origin (e.g., 'https://example.com')
 * @returns The validated path or null if invalid
 */
export function validateRedirectUrl(
  url: string | null,
  origin: string
): string | null {
  if (!url) return null

  try {
    const redirectUrl = new URL(url, origin)
    // Only allow same-origin redirects
    if (redirectUrl.origin !== origin) return null
    return redirectUrl.pathname + redirectUrl.search
  } catch {
    return null
  }
}

/**
 * Sanitizes error messages for production environments
 * Returns detailed errors in development, generic errors in production
 *
 * @param error - The original error message
 * @param fallbackMessage - The generic message to show in production
 * @returns The appropriate error message based on environment
 */
export function sanitizeErrorMessage(
  error: string,
  fallbackMessage: string = 'An error occurred'
): string {
  return process.env.NODE_ENV === 'development' ? error : fallbackMessage
}
