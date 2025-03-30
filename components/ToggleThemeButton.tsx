import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons'; 

const ToggleThemeButton: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <TouchableOpacity onPress={toggleDarkMode}>
      <View>
        <Ionicons
          name={isDarkMode ? 'moon' : 'sunny'}
          size={24}
          color={isDarkMode ? '#fff' : '#000'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ToggleThemeButton;