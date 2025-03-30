import { StackNavigationProp } from '@react-navigation/stack'; 
import { Job } from './types';


export type RootStackParamList = {
  JobFinder: undefined; 
  SavedJobs: undefined; 
  JobDetail: { job: Job }; 
};


export type JobDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'JobDetail'>;