import axios from '@/utils/axios';
import { User } from 'firebase/auth';

export const fetchProjects = async (userId: string): Promise<any[]> => {
  try {
    const response = await axios.get('/projects', { params: { userId } });
    return response.data.projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const fetchProject = async (projectId: string, userId: string): Promise<any> => {
  try {
    const response = await axios.get(`/project/${projectId}`);
    return response;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};


export const createProject = async (projectData: any, user: User | null) => {
  if (!user) throw new Error('User not authenticated');

  const token = await user.getIdToken(true);
  const response = await axios.post('project', projectData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const deleteProject = async (projectId: string, user: User | null) => {
  if (!user) throw new Error('User not authenticated');

  try {
    const token = await user.getIdToken(true);
    const response = await axios.delete(`/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
console.log("response: " + response.status);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};