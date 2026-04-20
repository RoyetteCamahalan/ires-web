export const getContrastingTextColor = (backgroundHexColor: any) => {
  // Parse the background color in hex format
  const r = parseInt(backgroundHexColor.slice(1, 3), 16);
  const g = parseInt(backgroundHexColor.slice(3, 5), 16);
  const b = parseInt(backgroundHexColor.slice(5, 7), 16);

  // Calculate the relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return white for dark backgrounds and black for light backgrounds
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
