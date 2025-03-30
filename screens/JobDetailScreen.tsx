import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import ApplicationForm from '../components/ApplicationForm';

type JobDetailScreenProps = {
  route?: RouteProp<RootStackParamList, 'JobDetail'>; 
  navigation?: any; 
};

const JobDetailScreen: React.FC<JobDetailScreenProps> = ({ route, navigation }) => {
  if (!route || !navigation) {
    return (
      <View style={styles.container}>
        <Text>Error: Missing route or navigation props.</Text>
      </View>
    );
  }

  const { job } = route.params; 
  const { isDarkMode } = useTheme();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const removeHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '');
  };

  const shortenDescription = (description: string) => {
    const sentences = description.split('.'); 
    const shortened = sentences.slice(0, 2).join('.') + '.'; 
    return shortened;
  };

  const themeColors = {
    background: isDarkMode ? '#121212' : '#fff',
    text: isDarkMode ? '#fff' : '#000',
    buttonBackground: isDarkMode ? '#48cae4' : '#48cae4',
    buttonText: isDarkMode ? '#121212' : '#fff',
    cardBackground: isDarkMode ? '#1E1E1E' : '#f0f0f0',
    iconColor: isDarkMode ? '#00b4d8' : '#00b4d8',
    borderTopColor: isDarkMode ? '#333' : '#ccc',
  };

  const handleApply = () => {
    setIsFormVisible(true); 
  };

  const handleFormSubmit = (values: { name: string; email: string; contactNumber: string; whyHireMe: string }) => {
    Alert.alert(
      'Application Submitted',
      'Thank you for applying! We will review your application and get back to you soon.',
      [
        {
          text: 'Okay',
          onPress: () => {
            setIsFormVisible(false); 
            navigation.goBack(); 
          },
        },
      ]
    );
  };

  const handleFormCancel = () => {
    setIsFormVisible(false); 
  };

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']} 
      style={[styles.safeArea, { backgroundColor: themeColors.background }]}
    >
     
      <ScrollView contentContainerStyle={styles.scrollContent}>
   
        <View style={styles.logoContainer}>
          {job.companyLogo ? (
            <Image source={{ uri: job.companyLogo }} style={styles.logo} />
          ) : (
            <View style={[styles.logo, styles.logoPlaceholder]}>
              <Text style={styles.logoPlaceholderText}>{job.company.charAt(0)}</Text>
            </View>
          )}
          <Text style={[styles.company, { color: themeColors.text }]}>{job.company}</Text>
        </View>

        {/* Job Title */}
        <Text style={[styles.title, { color: themeColors.text }]}>{job.title}</Text>

        {/* Location, Salary, and Job Type */}
        <View style={styles.metaContainer}>
          {/* Location */}
          <View style={styles.metaItem}>
            <View style={[styles.metaIconContainer, { backgroundColor: '#caf0f8'}]}>
              <MaterialIcons name="location-on" size={30} color={themeColors.iconColor} />
            </View>
            <Text style={[styles.metaText, { color: themeColors.text }]}>{job.location}</Text>
          </View>

          {/* Salary */}
          <View style={styles.metaItem}>
            <View style={[styles.metaIconContainer, { backgroundColor: '#caf0f8' }]}>
              <MaterialIcons name="attach-money" size={30} color={themeColors.iconColor} />
            </View>
            <Text style={[styles.metaText, { color: themeColors.text }]}>{job.salary}</Text>
          </View>

          {/* Job Type */}
          <View style={styles.metaItem}>
            <View style={[styles.metaIconContainer, { backgroundColor: '#caf0f8' }]}>
              <MaterialIcons name="work" size={30} color={themeColors.iconColor} />
            </View>
            <Text style={[styles.metaText, { color: themeColors.text }]}>{job.jobType}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={[styles.descriptionTitle, { color: themeColors.text }]}>Job Description</Text>
          <Text style={[styles.descriptionText, { color: themeColors.text }]}>
            {job.description
              ? shortenDescription(removeHtmlTags(job.description)) 
              : 'No description available.'}
          </Text>
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View style={[styles.applyButtonContainer, { borderTopColor: themeColors.borderTopColor }]}>
        <TouchableOpacity
          style={[styles.applyButton, { backgroundColor: themeColors.buttonBackground }]}
          onPress={handleApply}
        >
          <Text style={[styles.applyButtonText, { color: themeColors.buttonText }]}>Apply Now</Text>
        </TouchableOpacity>
      </View>

      {/* Application Form */}
      {isFormVisible && (
        <ApplicationForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          themeColors={themeColors}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 20,
  },
  logoPlaceholder: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholderText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  company: {
    fontSize: 18,
    fontWeight: '600',
    color: '#888',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metaItem: {
    alignItems: 'center',
    flex: 1,
  },
  metaIconContainer: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 5,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#888',
    marginBottom: 10,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  applyButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 30,
    marginBottom: 20,
  },
  applyButton: {
    padding: 20,
    borderRadius: 35,
    alignItems: 'center',
    shadowColor: '#48cae4', 
    shadowOffset: { width: 0, height: 0 }, 
    shadowOpacity: 0.5,
    shadowRadius: 9, 
    elevation: 10,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobDetailScreen;