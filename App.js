import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import My360 from './My360';
import {fetchImages} from './utils/fetchImages';
import {imageUrls} from './data/imageUrls';

const App = () => {
  const [images, setImages] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const setup = async () => {
    const imagePaths = await fetchImages();
    const mappedPaths = imagePaths.map(p => {
      const obj = {
        uri: 'file://' + p,
      };
      return obj;
    });
    setImages(mappedPaths);
    setIsReady(true);
    console.log('as', mappedPaths);
  };

  useEffect(() => {
    // For Loading Images from Phone
    // setrup();
  }, []);

  return (
    <View style={styles.container}>
      {/* Loading Images from Phone */}
      {/* {isReady && <My360 srcset={imageUrls} width={400} height={200} />} */}

      {/* Loading Images from Cloud */}
      <My360 srcset={imageUrls} width={400} height={200} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
