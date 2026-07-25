/**
 * CLOUDINARY UTILITIES
 * Helper functions for generating Cloudinary URLs with transformations
 * Update CLOUDINARY_CLOUD_NAME in your .env file
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "syivlqwt";
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Generate a Cloudinary image URL with transformations
 * @param {string} publicId - Cloudinary public ID
 * @param {object} options - Transformation options
 * @returns {string} - Full Cloudinary URL
 */
export const cloudinaryImage = (publicId, options = {}) => {
  const {
    width,
    height,
    crop = "auto",
    quality = "auto",
    format = "auto",
    fetch_format = "auto",
    ...rest
  } = options;

  let transformations = [
    "c_" + crop,
    "q_" + quality,
    "f_" + fetch_format
  ];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);

  const transforms = transformations.join(",");
  return `${CLOUDINARY_BASE_URL}/${transforms}/${publicId}`;
};

/**
 * Generate responsive srcSet for an image
 * @param {string} publicId - Cloudinary public ID
 * @param {array} widths - Array of widths to generate (e.g., [400, 800, 1200])
 * @returns {string} - srcSet string for img tag
 */
export const cloudinarySrcSet = (publicId, widths = [400, 800, 1200]) => {
  return widths
    .map(w => `${cloudinaryImage(publicId, { width: w })} ${w}w`)
    .join(", ");
};

/**
 * Generate a thumbnail/preview URL (optimized for performance)
 * @param {string} publicId - Cloudinary public ID
 * @param {number} width - Thumbnail width (default: 400)
 * @returns {string} - Thumbnail URL
 */
export const cloudinaryThumb = (publicId, width = 400) => {
  return cloudinaryImage(publicId, {
    width,
    height: width,
    crop: "fill",
    quality: "auto",
    fetch_format: "auto"
  });
};

/**
 * Generate a blurred placeholder URL for lazy loading
 * @param {string} publicId - Cloudinary public ID
 * @returns {string} - Blurred placeholder URL
 */
export const cloudinaryPlaceholder = (publicId) => {
  return cloudinaryImage(publicId, {
    width: 100,
    height: 100,
    crop: "fill",
    quality: 20,
    fetch_format: "auto",
    effect: "blur:1000"
  });
};

/**
 * Generate a full-size display URL
 * @param {string} publicId - Cloudinary public ID
 * @param {object} options - Additional transformation options
 * @returns {string} - Full display URL
 */
export const cloudinaryDisplay = (publicId, options = {}) => {
  return cloudinaryImage(publicId, {
    width: 1200,
    quality: "auto",
    fetch_format: "auto",
    ...options
  });
};

export default {
  cloudinaryImage,
  cloudinarySrcSet,
  cloudinaryThumb,
  cloudinaryPlaceholder,
  cloudinaryDisplay
};
