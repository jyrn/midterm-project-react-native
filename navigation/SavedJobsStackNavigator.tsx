import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SavedJobsScreen from '../screens/SavedJobsScreen';
import JobDetailScreen from '../screens/JobDetailScreen';


const Stack = createStackNavigator();

const SavedJobsStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="SavedJobs"
            component={SavedJobsScreen}
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

export default SavedJobsStackNavigator;