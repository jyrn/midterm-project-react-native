import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useJobContext } from '../context/JobContext';
import { useTheme } from '../context/ThemeContext';
import JobFinderStackNavigator from './JobFinderStackNavigator';
import SavedJobsStackNavigator from './SavedJobsStackNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const { savedJobs } = useJobContext();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.navBackground,
          borderTopColor: colors.navBorder,
          borderTopWidth: 1,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: colors.navActiveTint,
        tabBarInactiveTintColor: colors.navInactiveTint,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarIconStyle: {
          marginBottom: -4,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="JobFinder"
        component={JobFinderStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
          tabBarLabel: 'Find Jobs',
        }}
      />

      <Tab.Screen
        name="SavedJobs"
        component={SavedJobsStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bookmark" size={size} color={color} />
          ),
          tabBarLabel: 'Saved Jobs',
          tabBarBadge: savedJobs.length > 0 ? savedJobs.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.navBadgeBackground,
            color: colors.navBadgeText,
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;