import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JobFinderScreen from '../screens/JobFinderScreen';
import JobDetailScreen from '../screens/JobDetailScreen';

const Stack = createStackNavigator();

const JobFinderStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="JobFinder"
        component={JobFinderScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetailScreen}
        options={{
          title: 'Job Details', 
          headerStyle: {
            backgroundColor: '#48cae4', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default JobFinderStackNavigator;