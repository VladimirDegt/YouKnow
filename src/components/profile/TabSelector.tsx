import { COLORS } from '@/src/constants/colors';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

interface TabSelectorProps {
  tabs: { key: string; label: string }[];
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const TabSelector = ({ tabs, activeTab, onTabPress }: TabSelectorProps) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const [tabWidth, setTabWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTabWidth(width / tabs.length);
  };

  useEffect(() => {
    if (tabWidth > 0) {
      const activeIndex = tabs.findIndex(tab => tab.key === activeTab);
      Animated.spring(indicatorPosition, {
        toValue: activeIndex,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    }
  }, [activeTab, indicatorPosition, tabWidth, tabs]);

  const translateX = indicatorPosition.interpolate({
    inputRange: tabs.map((_, i) => i),
    outputRange: tabs.map((_, i) => i * tabWidth),
  });

  return (
    <View style={[styles.tabsContainer, isTablet && styles.tabsContainerTablet]}>
      <View style={styles.tabsWrapper} onLayout={handleLayout}>
        {tabs.map((tab, idx) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              isTablet && styles.tabTablet,
              activeTab === tab.key && styles.activeTab,
            ]}
            onPress={() => onTabPress(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === tab.key }}
            accessibilityLabel={tab.label}
          >
            <Text
              style={[
                styles.tabText,
                isTablet && styles.tabTextTablet,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.indicator,
            isTablet && styles.indicatorTablet,
            {
              transform: [{ translateX }],
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
