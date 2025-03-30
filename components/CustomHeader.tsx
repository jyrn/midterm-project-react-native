import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useTheme } from '../context/ThemeContext';
import ToggleThemeButton from './ToggleThemeButton';

const CustomHeader: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView edges={['top']} style={[styles.header, { backgroundColor: isDarkMode ? '#121212' : '#f7f7f7' }]}>
      <View style={styles.headerContent}>
        <Text style={[styles.headerText, { color: isDarkMode ? '#48cae4' : '#0077b6' }]}>
          Welcome, Job Finder!
        </Text>
      </View>
      <ToggleThemeButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center', 
    marginTop:20
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CustomHeader;