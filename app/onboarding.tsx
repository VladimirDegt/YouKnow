import {COLORS} from '@/src/constants/colors';
import {Image} from 'expo-image';
import {router} from 'expo-router';
import React, {useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View,} from 'react-native';
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withSpring,} from 'react-native-reanimated';
import {onboardingUtils} from '@/app/utils/onboarding';

type OnboardingSlide = {
  id: string;
  title: string;
  description: string;
  image: any;
};

type SlideProps = {
  item: OnboardingSlide;
  index: number;
  width: number;
  scrollX: Animated.SharedValue<number>;
  isTablet: boolean;
};

const OnboardingScreen = () => {
  const {width, height} = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);
  const {t} = useTranslation();
  
  const isTablet = width >= 768 || height >= 1024;
  
  const onboardingData = useMemo(() => [
    {
      id: '1',
      title: t('onboarding.slides.slide1.title'),
      description: t('onboarding.slides.slide1.description'),
      image: require('../assets/images/onboarding-1.jpg'),
    },
    {
      id: '2',
      title: t('onboarding.slides.slide2.title'),
      description: t('onboarding.slides.slide2.description'),
      image: require('../assets/images/onboarding-2.png'),
    },
    {
      id: '3',
      title: t('onboarding.slides.slide3.title'),
      description: t('onboarding.slides.slide3.description'),
      image: require('../assets/images/onboarding-3.png'),
    },
  ], [t]);
  
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
  
  const renderItem = ({item, index}: { item: OnboardingSlide; index: number }) => (
    <Slide
      item={item}
      index={index}
      width={width}
      scrollX={scrollX}
      isTablet={isTablet}
    />
  );
  
  const Pagination = () => {
    return (
      <View style={[styles.paginationContainer, isTablet && styles.paginationContainerTablet]}>
        {onboardingData.map((_, index) => (
          <PaginationDot
            key={index}
            index={index}
            width={width}
            scrollX={scrollX}
            isTablet={isTablet}
          />
        ))}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[styles.skipButton, isTablet && styles.skipButtonTablet]}
        onPress={handleSkip}
      >
        <Text style={[styles.skipText, isTablet && styles.skipTextTablet]}>{t('common.skip')}</Text>
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
      
      <TouchableOpacity
        style={[styles.button, isTablet && styles.buttonTablet]}
        onPress={handleNext}
      >
        <Text style={[styles.buttonText, isTablet && styles.buttonTextTablet]}>
          {currentIndex === onboardingData.length - 1 ? t('onboarding.buttons.start') : t('onboarding.buttons.next')}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const Slide = ({item, index, width, scrollX, isTablet}: SlideProps) => {
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
      transform: [{scale: withSpring(scale)}],
    };
  });
  
  return (
    <View style={[styles.slide, {width}, isTablet && styles.slideTablet]}>
      <Animated.View style={[styles.imageContainer, isTablet && styles.imageContainerTablet, animatedStyle]}>
        <Image
          source={item.image}
          style={styles.image}
          contentFit="contain"
        />
      </Animated.View>
      <Text style={[styles.title, isTablet && styles.titleTablet]}>{item.title}</Text>
      <Text style={[styles.description, isTablet && styles.descriptionTablet]}>{item.description}</Text>
    </View>
  );
};

type PaginationDotProps = {
  index: number;
  width: number;
  scrollX: Animated.SharedValue<number>;
  isTablet: boolean;
};

const PaginationDot = ({index, width, scrollX, isTablet}: PaginationDotProps) => {
  const inputRange = [
    (index - 1) * width,
    index * width,
    (index + 1) * width,
  ];
  
  const dotWidth = useAnimatedStyle(() => {
    const baseWidth = isTablet ? 12 : 8;
    const activeWidth = isTablet ? 30 : 20;
    const width = interpolate(
      scrollX.value,
      inputRange,
      [baseWidth, activeWidth, baseWidth],
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
      style={[styles.dot, isTablet && styles.dotTablet, dotWidth, opacity]}
    />
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
  slideTablet: {
    padding: 40,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginBottom: 40,
  },
  imageContainerTablet: {
    height: 450,
    marginBottom: 60,
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
  titleTablet: {
    fontSize: 42,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.text_gray,
    paddingHorizontal: 20,
  },
  descriptionTablet: {
    fontSize: 24,
    paddingHorizontal: 40,
    lineHeight: 32,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  paginationContainerTablet: {
    marginBottom: 40,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.btn_background,
    marginHorizontal: 4,
  },
  dotTablet: {
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  button: {
    backgroundColor: COLORS.btn_background,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 40,
    marginHorizontal: 20,
  },
  buttonTablet: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 35,
    marginBottom: 60,
    marginHorizontal: 40,
  },
  buttonText: {
    color: COLORS.text_white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextTablet: {
    fontSize: 24,
  },
  skipButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
  skipButtonTablet: {
    top: 20,
    right: 30,
    padding: 12,
  },
  skipText: {
    color: COLORS.btn_background,
    fontSize: 17,
    fontWeight: '400',
  },
  skipTextTablet: {
    fontSize: 22,
  },
});

export default OnboardingScreen;
