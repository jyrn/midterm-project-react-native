import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Job } from '../types/types';
import { Alert } from 'react-native'

type JobContextType = {
  savedJobs: Job[];
  onSave: (job: Job) => void;
  onRemove: (job: Job) => void;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  const onSave = (job: Job) => {
    setSavedJobs((prev) => [...prev, job]);
    Alert.alert('Saved!', 'Job has been saved successfully.');
  };

  const onRemove = (job: Job) => {
    setSavedJobs((prev) => prev.filter((savedJob) => savedJob.id !== job.id));
    Alert.alert('Removed', 'Job has been removed from your saved jobs.');
  };

  return (
    <JobContext.Provider value={{ savedJobs, onSave, onRemove }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};