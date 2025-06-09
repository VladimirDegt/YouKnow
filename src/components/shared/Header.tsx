import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '@/src/constants/colors';

const Header: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.container,
      { paddingTop: insets.top }
    ]}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.background,
  },
  logoContainer: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 32,
    width: 120,
  },
});

export default Header;
