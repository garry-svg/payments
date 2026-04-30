/**
 * Extracts the slug from a blog post filename or path.
 * Removes the date prefix (YYYY-MM-DD-) if present.
 * Handles trailing slashes.
 * 
 * @param path - The filename or path to extract the slug from
 * @returns The extracted slug
 */
export const extractSlug = (path: string): string => {
  // Remove trailing slash if present
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path
  
  // Get the last segment of the path
  const segments = normalizedPath.split('/')
  const lastSegment = segments[segments.length - 1]
  
  // Match YYYY-MM-DD-slug
  const datePattern = /^\d{4}-\d{2}-\d{2}-(.+)$/
  const match = lastSegment.match(datePattern)
  
  return match ? match[1] : lastSegment
}
