import React, {useState, useRef} from 'react';
import {View, Dimensions, PanResponder, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('window');

const My360 = ({
  width: initialWidth,
  height: initialHeight,
  srcset,
  rotationRatio,
}) => {
  const [rotation, setRotation] = useState(0);
  const rotatePeriod = 360 / srcset.length;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        startMoving(gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        moving(gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        endMoving(gestureState);
      },
    }),
  ).current;

  let startX = 0;
  let startRotation = 0;
  let currentX = 0;

  const startMoving = gestureState => {
    startX = gestureState.moveX;
    startRotation = rotation;
  };

  const moving = gestureState => {
    currentX = gestureState.moveX;
    updateRotation();
  };

  const endMoving = gestureState => {
    currentX = gestureState.moveX;
    updateRotation();
  };

  const updateRotation = () => {
    const deltaRotation =
      ((currentX - startX) * 180) / (rotationRatio * initialWidth);
    setRotation(startRotation + deltaRotation);
  };

  const getImage = () => {
    const mRotation = rotation - Math.floor(rotation / 360) * 360;
    const index = Math.floor(mRotation / rotatePeriod);
    return srcset[index];
  };

  return (
    <View {...panResponder.panHandlers} key="12wxsax">
      <FastImage
        source={{
          uri: getImage().uri,
          priority: FastImage.priority.high,
        }}
        resizeMode="contain"
        style={[
          {
            width: initialWidth,
            height: initialHeight,
          },
        ]}
      />
    </View>
  );
};
My360.defaultProps = {
  width,
  height: 300,
  srcset: [],
  rotationRatio: 0.5,
};

export default My360;
const styles = StyleSheet.create({});
