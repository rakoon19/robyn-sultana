// src/utils/cloudinaryHelper.js
export const getResizedImageUrl = (imageUrl, options = {}) => {
    if (!imageUrl || !imageUrl.includes('/image/upload/')) {
        return imageUrl;
    }

    const {
        width = 'auto',
        height = 'auto',
        crop = 'fill',
        format = 'auto',
        quality = 'auto'
    } = options;

    const transformations = `w_${width},h_${height},c_${crop},f_${format},q_${quality}`;
    const uploadSegment = '/image/upload/';
    const uploadIndex = imageUrl.indexOf(uploadSegment) + uploadSegment.length;

    // This is what injects the transformation string right after /image/upload/
    return imageUrl.slice(0, uploadIndex) + transformations + '/' + imageUrl.slice(uploadIndex);
};