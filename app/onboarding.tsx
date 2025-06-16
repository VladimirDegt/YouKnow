import { COLORS } from '@/src/constants/colors';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import onboardingUtils from './utils/onboarding';

const onboardingData = [
  {
    id: '1',
    title: 'Добро пожаловать',
    description: 'Исследуйте мир с нашим приложением',
    image: require('../assets/images/onboarding-1.png'),
  },
  {
    id: '2',
    title: 'Откройте новые возможности',
    description: 'Находите интересные места и события',
    image: require('../assets/images/onboarding-2.png'),
  },
  {
    id: '3',
    title: 'Начните прямо сейчас',
    description: 'Присоединяйтесь к нашему сообществу',
    image: require('../assets/images/onboarding-3.png'),
  },
];

type SlideProps = {
  item: typeof onboardingData[0];
  index: number;
  width: number;
  scrollX: Animated.SharedValue<number>;
};

const Slide = ({ item, index, width, scrollX }: SlideProps) => {
  const inputRange = [
    (index - 1) * width,
    index * width,
    (index + 1) * width,
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.8, 1, 0.8],
      'clamp'
    );

    return {
      transform: [{ scale: withSpring(scale) }],
    };
  });

  return (
    <View style={[styles.slide, { width }]}>
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image
          source={item.image}
          style={styles.image}
          contentFit="contain"
        />
      </Animated.View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

type PaginationDotProps = {
  index: number;
  width: number;
  scrollX: Animated.SharedValue<number>;
};

const PaginationDot = ({ index, width, scrollX }: PaginationDotProps) => {
  const inputRange = [
    (index - 1) * width,
    index * width,
    (index + 1) * width,
  ];

  const dotWidth = useAnimatedStyle(() => {
    const width = interpolate(
      scrollX.value,
      inputRange,
      [8, 20, 8],
      'clamp'
    );

    return {
      width,
    };
  });

  const opacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      'clamp'
    );

    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={[styles.dot, dotWidth, opacity]}
    />
  );
};

const OnboardingScreen = () => {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);

  const handleSkip = async () => {
    await onboardingUtils.setOnboardingCompleted();
    router.replace('/');
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleSkip();
    }
  };

  const renderItem = ({ item, index }: { item: typeof onboardingData[0]; index: number }) => (
    <Slide item={item} index={index} width={width} scrollX={scrollX} />
  );

  const Pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => (
          <PaginationDot
            key={index}
            index={index}
            width={width}
            scrollX={scrollX}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Пропустить</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          scrollX.value = event.nativeEvent.contentOffset.x;
          setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / width));
        }}
        scrollEventThrottle={16}
      />

      <Pagination />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === onboardingData.length - 1 ? 'Начать' : 'Далее'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: COLORS.text_black,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.text_gray,
    paddingHorizontal: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.btn_background,
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: COLORS.btn_background,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 40,
    marginHorizontal: 20,
  },
  buttonText: {
    color: COLORS.text_white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  skipText: {
    color: COLORS.btn_background,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen; 