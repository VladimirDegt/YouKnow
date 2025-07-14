import { COLORS } from '@/src/constants/colors';
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, View, useWindowDimensions } from 'react-native';

import LanguageSelector from '@/src/components/profile/LanguageSelector';
import SupportTab from '@/src/components/profile/SupportTab';
import TabSelector from '@/src/components/profile/TabSelector';
import ArrowBack from '@/src/components/shared/ArrowBack';
import { useTranslation } from 'react-i18next';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState<'language' | 'support'>('language');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const { t } = useTranslation();
  const profileTabs = [
    { key: 'language', label: t('profile.tabs.language') },
    { key: 'support', label: t('profile.tabs.support') },
  ];

  const handleTabPress = (tab: string) => {
    setActiveTab(tab as 'language' | 'support');
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setActiveTab(tab as 'language' | 'support');
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
    <View style={[styles.container, isTablet && styles.containerTablet]}>
      <ArrowBack />
      <TabSelector activeTab={activeTab} onTabPress={handleTabPress} tabs={profileTabs} />
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
  containerTablet: {
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  contentContainer: {
    flex: 1,
  },
});

export default ProfileScreen;
