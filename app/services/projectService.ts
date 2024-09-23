import axios from "@/utils/axios";
import { User } from "firebase/auth";
import { registerStore } from "./storeService";

export const fetchProjects = async (userId: string): Promise<any[]> => {
  try {
    const response = await axios.get("/projects", { params: { userId } });
    return response.data.projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const fetchProject = async (
  projectId: string,
  userId: string
): Promise<any> => {
  try {
    const response = await axios.get(`/project/${projectId}`);
    return response;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

export const createProject = async (projectData: any, user: User | null) => {
  if (!user) throw new Error("User not authenticated");
  try {
    const token = await user.getIdToken(true);
    const response = await axios.post("project", projectData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    try {
     const resp =  await registerStore(response.data.projectId);
     console.log(resp);

    } catch (error) {
      console.error("Error creating store:", error);
    }
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const deleteProject = async (projectId: string, user: User | null) => {
  if (!user) throw new Error("User not authenticated");

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
    console.error("Error deleting project:", error);
    throw error;
  }
};
