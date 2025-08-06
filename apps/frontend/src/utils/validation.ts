export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidSlug = (slug: string): boolean => {
  if (slug.length === 0) return true; // Empty slug is allowed
  return /^[a-zA-Z0-9-_]+$/.test(slug) && slug.length >= 3 && slug.length <= 20;
};