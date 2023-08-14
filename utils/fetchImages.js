import RNFetchBlob from 'rn-fetch-blob';
import {imageUrls} from '../data/imageUrls';

export const fetchImages = async () => {
  const promises = [];

  for (const imageUrl of imageUrls) {
    promises.push(
      RNFetchBlob.config({
        fileCache: true,
      }).fetch('GET', imageUrl),
    );
  }

  try {
    const responses = await Promise.all(promises);
    const imagePaths = responses.map(response => response.path());
    return imagePaths;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
