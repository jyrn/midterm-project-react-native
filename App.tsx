// App.tsx
import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { JobProvider } from './context/JobContext';
import BottomTabNavigator from './navigation/BottomTabNavigator';

// Custom navigation theme creator
const AppContent = () => {
  const { colors, isDarkMode } = useTheme();

  const navigationTheme = isDarkMode ? DarkTheme : DefaultTheme;
  
  const combinedTheme = {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.cardBackground,
      text: colors.text,
      border: colors.navBorder,
    },
  };

  return (
    <NavigationContainer theme={combinedTheme}>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <JobProvider>
          <AppContent />
        </JobProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;