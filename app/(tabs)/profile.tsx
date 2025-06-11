import {COLORS} from '@/src/constants/colors';
import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import LanguageSelector from '@/src/components/profile/LanguageSelector';
import SupportTab from '@/src/components/profile/SupportTab';
import TabSelector from '@/src/components/profile/TabSelector';
import ArrowBack from '@/src/components/shared/ArrowBack';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState<'language' | 'support'>('language');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleTabPress = (tab: 'language' | 'support') => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setActiveTab(tab);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'language':
        return <LanguageSelector />;
      case 'support':
        return <SupportTab />;
    }
  };

  return (
    <View style={styles.container}>
      <ArrowBack />
      <TabSelector activeTab={activeTab} onTabPress={handleTabPress} />
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        {renderContent()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
  },
});

export default ProfileScreen;
