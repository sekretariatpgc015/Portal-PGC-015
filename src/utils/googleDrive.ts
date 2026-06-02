/**
 * Utility to convert any Google Drive file URL into a direct-displayable thumbnail/image URL.
 * Handles share links, export/view links, open links, and direct IDs.
 */
export function getGoogleDriveImageUrl(url: string | null | undefined): string {
  if (!url) return '';

  // If it's already an Unsplash image, return as is
  if (url.includes('unsplash.com')) {
    return url;
  }

  let fileId = '';

  try {
    if (url.includes('id=')) {
      const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]{28,100})/);
      if (idMatch && idMatch[1]) {
        fileId = idMatch[1];
      }
    }

    if (!fileId) {
      // Matches both lh3.googleusercontent.com/u/0/d/... and drive.google.com/file/d/...
      const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]{28,100})/);
      if (dMatch && dMatch[1]) {
        fileId = dMatch[1];
      }
    }
  } catch (e) {
    // Fallback parsing
    const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]{28,100})/);
    if (dMatch && dMatch[1]) {
      fileId = dMatch[1];
    }
  }

  if (fileId) {
    // Return high-resolution web-optimized Google Drive output (w1000) for crystal clear display
    return `https://lh3.googleusercontent.com/u/0/d/${fileId}=w1000`;
  }

  return url;
}
