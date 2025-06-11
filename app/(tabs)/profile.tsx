import { COLORS } from '@/src/constants/colors';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import LanguageSelector from '@/src/components/profile/LanguageSelector';
import SupportTab from '@/src/components/profile/SupportTab';
import TabSelector from '@/src/components/profile/TabSelector';
import ArrowBack from '@/src/components/shared/ArrowBack';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState<'language' | 'support'>('language');

  const handleTabPress = (tab: 'language' | 'support') => {
    setActiveTab(tab);
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
      {renderContent()}
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
});

export default ProfileScreen;
