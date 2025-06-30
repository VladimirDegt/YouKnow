import {COLORS} from '@/src/constants/colors';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Animated, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';

type TabType = 'language' | 'support';

interface TabSelectorProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

const TabSelector = ({activeTab, onTabPress}: TabSelectorProps) => {
  const {t} = useTranslation();
  const {width} = useWindowDimensions();
  const isTablet = width >= 768;
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const [tabWidth, setTabWidth] = useState(0);
  
  const handleLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setTabWidth(width / 2);
  };
  
  useEffect(() => {
    if (tabWidth > 0) {
      Animated.spring(indicatorPosition, {
        toValue: activeTab === 'language' ? 0 : 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    }
  }, [activeTab, indicatorPosition, tabWidth]);
  
  const translateX = indicatorPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, tabWidth],
  });
  
  return (
    <View style={[styles.tabsContainer, isTablet && styles.tabsContainerTablet]}>
      <View
        style={styles.tabsWrapper}
        onLayout={handleLayout}
      >
        <TouchableOpacity
          style={[styles.tab, isTablet && styles.tabTablet, activeTab === 'language' && styles.activeTab]}
          onPress={() => onTabPress('language')}
        >
          <Text style={[styles.tabText, isTablet && styles.tabTextTablet, activeTab === 'language' && styles.activeTabText]}>
            {t('profile.tabs.language')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, isTablet && styles.tabTablet, activeTab === 'support' && styles.activeTab]}
          onPress={() => onTabPress('support')}
        >
          <Text style={[styles.tabText, isTablet && styles.tabTextTablet, activeTab === 'support' && styles.activeTabText]}>
            {t('profile.tabs.support')}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.indicator,
            isTablet && styles.indicatorTablet,
            {
              transform: [{translateX}],
              width: tabWidth,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabsContainerTablet: {
    marginTop: 40,
  },
  tabsWrapper: {
    flexDirection: 'row',
    position: 'relative',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabTablet: {
    paddingVertical: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    color: COLORS.text_gray,
  },
  tabTextTablet: {
    fontSize: 24,
  },
  activeTabText: {
    color: COLORS.btn_background,
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    height: 2,
    backgroundColor: COLORS.btn_background,
  },
  indicatorTablet: {
    height: 3,
  },
});

export default TabSelector;
