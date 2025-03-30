import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { MaterialIcons } from '@expo/vector-icons';
import JobCard from '../components/JobCard';
import { Job } from '../types/types';
import { useJobContext } from '../context/JobContext';
import { useTheme } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import { useFocusEffect } from '@react-navigation/native'; 

const JobFinderScreen: React.FC = ({ navigation }) => {
  const { savedJobs, onSave, onRemove } = useJobContext();
  const { isDarkMode } = useTheme();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const themeColors = {
    background: isDarkMode ? '#121212' : '#f7f7f7',
    text: isDarkMode ? '#fff' : '#000',
    icon: isDarkMode ? '#fff' : '#000',
    placeholder: isDarkMode ? '#888' : '#888',
    searchBarBackground: isDarkMode ? '#333' : '#f0f0f0',
    primary: isDarkMode ? '#BB86FC' : '#6200ee',
    error: isDarkMode ? '#CF6679' : '#B00020',
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://empllo.com/api/v1');

        if (response.data && Array.isArray(response.data.jobs)) {
          const jobsData: Job[] = response.data.jobs.map((job: any) => ({
            id: uuidv4(),
            title: job.title || '',
            company: job.companyName || '',
            salary: `${job.minSalary} - ${job.maxSalary}`,
            saved: false,
            companyLogo: job.companyLogo || '',
            location: job.locations?.join(', ') || 'Not specified',
            jobType: job.jobType || 'Not specified',
            workModel: job.workModel || 'Remote',
            description: job.description || 'No description available',
            seniorityLevel: job.seniorityLevel || 'Not specified',
          }));
          setJobs(jobsData);
          setFilteredJobs(jobsData);
        } else {
          setError('Jobs data is not in the expected format.');
        }
        setLoading(false);
      } catch (err: any) {
        setError(`Error fetching jobs: ${err.message}`);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchQuery, jobs]);

  const handleSave = (job: Job) => {
    onSave(job);
  };

  const handleRemove = (job: Job) => {
    onRemove(job);
  };

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >

      <CustomHeader />

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={[styles.searchBar, { backgroundColor: themeColors.searchBarBackground }]}>
          <MaterialIcons
            name="search"
            size={24}
            color={themeColors.icon}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: themeColors.text }]}
            placeholder="Search jobs by title, company, or location..."
            placeholderTextColor={themeColors.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={24} color={themeColors.icon} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading && <ActivityIndicator size="large" color={themeColors.primary} />}
      {error && <Text style={[styles.errorText, { color: themeColors.error }]}>{error}</Text>}

      {filteredJobs.length > 0 ? (
        <FlatList
          data={filteredJobs}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onSave={handleSave}
              onRemove={handleRemove}
              isSaved={savedJobs.some((savedJob) => savedJob.id === item.id)}
              
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        !loading && <Text style={{ color: themeColors.text }}>No jobs match your search.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
  },
  searchBarContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default JobFinderScreen;