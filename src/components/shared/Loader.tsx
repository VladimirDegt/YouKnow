import {useTheme} from '@react-navigation/native';
import {FC, useEffect, useRef} from 'react';
import {Animated, Easing, View} from 'react-native';

const Loader: FC = () => {
  const { colors } = useTheme();
  const spinValue = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue.current, {
        toValue: 1,
        duration: 250,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);
  
  const spin = spinValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  return (
    <View style={{width: 24, height: 24}}>
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          borderWidth: 3,
          borderRadius: 12,
          borderColor: colors.background,
          borderBottomColor: colors.primary,
          transform: [{rotate: spin}],
        }}
      />
    </View>
  );
};

export default Loader;
