import { COLORS } from '@/src/constants/colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TabType = 'language' | 'support';

interface TabSelectorProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

const TabSelector = ({activeTab, onTabPress}: TabSelectorProps) => {
  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'language' && styles.activeTab]}
        onPress={() => onTabPress('language')}>
        <Text style={[styles.tabText, activeTab === 'language' && styles.activeTabText]}>
          Language
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'support' && styles.activeTab]}
        onPress={() => onTabPress('support')}>
        <Text style={[styles.tabText, activeTab === 'support' && styles.activeTabText]}>
          Support
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default TabSelector; 