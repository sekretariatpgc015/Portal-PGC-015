/**
 * Utility to convert any Google Drive file URL into a direct-displayable thumbnail/image URL.
 * Handles share links, export/view links, open links, and direct IDs.
 */
export function getGoogleDriveImageUrl(url: string | null | undefined): string {
  if (!url) return '';

  // If it's already a direct thumbnail or googleusercontent link, keep it as is
  if (url.includes('drive.google.com/thumbnail') || url.includes('lh3.googleusercontent.com/d/')) {
    return url;
  }

  let fileId = '';

  try {
    if (url.includes('drive.google.com') || url.includes('docs.google.com')) {
      // 1. Match paths like /file/d/ID/view or /file/d/ID
      const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (fileDMatch && fileDMatch[1]) {
        fileId = fileDMatch[1];
      } else {
        // 2. Try matching query parameter 'id' for open/uc urls
        const urlObj = new URL(url);
        const idParam = urlObj.searchParams.get('id');
        if (idParam) {
          fileId = idParam;
        }
      }
    } else {
      // Maybe some fallback pattern search for file ID inside non-standard links
      const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]{28,50})/);
      if (dMatch && dMatch[1]) {
        fileId = dMatch[1];
      }
    }
  } catch (e) {
    // URL parsing fallback
    const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileDMatch && fileDMatch[1]) {
      fileId = fileDMatch[1];
    }
  }

  // If we successfully extracted a file ID, return the formatted thumbnail URL
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}`;
  }

  return url;
}
