import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJobContext } from '../context/JobContext';
import { Job } from '../types/types';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../types/navigation'; 
import { useTheme } from '../context/ThemeContext'; 


type SavedJobsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SavedJobs'>;  
};

const SavedJobsScreen: React.FC<SavedJobsScreenProps> = ({ navigation }) => {
  const { savedJobs, onRemove } = useJobContext();
  const { isDarkMode } = useTheme();

 
  const themeColors = {
    background: isDarkMode ? '#121212' : '#f7f7f7',
    text: isDarkMode ? '#fff' : '#333',
    cardBackground: isDarkMode ? '#1E1E1E' : '#fff',
    iconColor: isDarkMode ? '#48cae4' : '#48cae4',
    buttonBackground: isDarkMode ? '#DC3545' : '#DC3545',
    buttonText: isDarkMode ? '#121212' : '#fff',
    headerBackground: isDarkMode ? '#121212' : '#f7f7f7',
    headerText: isDarkMode ? '#fff' : '#333',
    emptyText: isDarkMode ? '#fff' : '#333',
    emptySubText: isDarkMode ? '#888' : '#666',
  };

  
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'flex' }, 
      });

     
      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: { display: 'none' }, 
        });
      };
    }, [navigation])
  );

  const renderJobItem = ({ item }: { item: Job }) => {
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: themeColors.cardBackground }]}
        onPress={() => navigation.navigate('JobDetail', { job: item })} 
      >
        <View style={styles.header}>
          {item.companyLogo && (
            <Image source={{ uri: item.companyLogo }} style={styles.logo} />
          )}
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: themeColors.text }]}>{item.title}</Text>
            <View style={styles.infoContainer}>
              <MaterialIcons name="business" size={16} color={themeColors.iconColor} style={styles.icon} />
              <Text style={[styles.company, { color: themeColors.text }]}>{item.company}</Text>
            </View>
            <View style={styles.infoContainer}>
              <MaterialIcons name="work" size={16} color={themeColors.iconColor} style={styles.icon} />
              <Text style={[styles.jobType, { color: themeColors.text }]}>{item.jobType}</Text>
            </View>
          </View>
         
          <MaterialIcons name="chevron-right" size={24} color={themeColors.iconColor} style={styles.arrowIcon} />
        </View>
     
        <TouchableOpacity
          style={styles.removeIcon}
          onPress={() => onRemove(item)}
        >
          <MaterialIcons 
            name="delete" 
            size={24} 
            color={themeColors.buttonBackground} 
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: themeColors.background }]}
    >
      {/* Header */}
      <View style={[styles.headerContainer, { backgroundColor: themeColors.headerBackground }]}>
        <Text style={[styles.headerText, { color: themeColors.headerText }]}>Saved Jobs</Text>
      </View>

      <View style={styles.container}>
        {savedJobs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: themeColors.emptyText }]}>No jobs saved yet.</Text>
            <Text style={[styles.emptySubText, { color: themeColors.emptySubText }]}>Save jobs to view them here!</Text>
          </View>
        ) : (
          <FlatList
            data={savedJobs}
            renderItem={renderJobItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  titleContainer: {
    flex: 1,
    marginRight: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 8,
  },
  company: {
    fontSize: 14,
  },
  jobType: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  arrowIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  removeIcon: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  removeButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SavedJobsScreen;