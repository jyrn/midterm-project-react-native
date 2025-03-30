import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Job } from '../types/types'; 
import { useTheme } from '../context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack'; 

type JobCardProps = {
  job: Job;
  onSave: (job: Job) => void;
  onRemove: (job: Job) => void;
  isSaved: boolean;
};

const JobCard: React.FC<JobCardProps> = ({ job, onSave, onRemove, isSaved }) => {
  const { colors: themeColors } = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); 

  const handleCardPress = () => {
    navigation.navigate('JobDetail', { job }); 
  };
  

  return (
    <TouchableOpacity onPress={handleCardPress} activeOpacity={0.8}>
      <View style={[styles.card, { backgroundColor: themeColors.cardBackground }]}>
        {/* Company Logo */}
        <View style={styles.logoContainer}>
          {job.companyLogo ? (
            <Image source={{ uri: job.companyLogo }} style={styles.logo} />
          ) : (
            <View style={[styles.logo, styles.logoPlaceholder]}>
              <Text style={styles.logoPlaceholderText}>{job.company.charAt(0)}</Text>
            </View>
          )}
        </View>

        {/* Job Details */}
        <View style={styles.detailsContainer}>
          <Text style={[styles.title, { color: themeColors.text }]}>{job.title}</Text>
          <Text style={[styles.company, { color: themeColors.text }]}>{job.company}</Text>

          {/* Location and Job Type */}
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <MaterialIcons name="location-on" size={16} color={themeColors.icon} />
              <Text style={[styles.metaText, { color: themeColors.text }]}>{job.location}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="work" size={16} color={themeColors.icon} />
              <Text style={[styles.metaText, { color: themeColors.text }]}>{job.jobType}</Text>
            </View>
          </View>
        </View>

        {/* Save/Remove Icon Toggle */}
        <TouchableOpacity
          onPress={() => (isSaved ? onRemove(job) : onSave(job))}
          style={styles.iconButton}
        >
          <MaterialIcons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isSaved ? themeColors.savedButton : themeColors.icon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logoContainer: {
    marginRight: 15,
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  logoPlaceholder: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#888',
  },
  iconButton: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
    marginTop: -10,
  },
});

export default JobCard;