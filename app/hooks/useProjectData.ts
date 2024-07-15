import { useFetchData } from './useFetchData';

const api = process.env.NEXT_PUBLIC_API_PROJECT_URL as string;




export function useProjectData(userId: string, projectId: string | null) {
    
    const { data: pramsData, isLoading: pramsIsLoading, error: pramsError, mutate } = useFetchData(`${api}/${projectId}/project-params?userId=${userId}`);
    const { data: objData, isLoading: objIsLoading, error: objError } = useFetchData(`${api}/${projectId}/project-objects?userId=${userId}`);

    const isLoading = {
        pramsIsLoading,
        objIsLoading
    };
    const error = {
        pramsError,
        objError
    };
    const data = {
        pramsData,
        objData
    };


    return { data, isLoading, error, mutate };
}
