import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import ArrowBack from '@/src/components/shared/ArrowBack';
import {COLORS} from '@/src/constants/colors';
import {useTranslation} from 'react-i18next';
import i18next from '@/services/i18next';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState<'language' | 'support'>('language');
  const { t } = useTranslation();
  
  console.log('t', t);

  const handleTabPress = (tab: 'language' | 'support') => {
    setActiveTab(tab);
  };
  
  const handleChangeLang = () => {
    console.log('Change language pressed');
    i18next.changeLanguage('ru'); // Здесь можно указать нужный язык
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'language':
        return (
          <View style={styles.tabContent}>
            <TouchableOpacity
              onPress={handleChangeLang}>
              <Text >
                {t('btnText')}
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 'support':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.content}>Информация о поддержке</Text>
            {/* Здесь будет контент для поддержки */}
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <ArrowBack />
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'language' && styles.activeTab]}
          onPress={() => handleTabPress('language')}>
          <Text style={[styles.tabText, activeTab === 'language' && styles.activeTabText]}>
            Language
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'support' && styles.activeTab]}
          onPress={() => handleTabPress('support')}>
          <Text style={[styles.tabText, activeTab === 'support' && styles.activeTabText]}>
            Support
          </Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    color: COLORS.text_gray,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    paddingTop: 24,
  },
  content: {
    fontSize: 16,
    color: COLORS.text_black,
    lineHeight: 24,
  },
});
