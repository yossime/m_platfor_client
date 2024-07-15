import { useFetchData } from './useFetchData';

const api = process.env.NEXT_PUBLIC_API_USER_DATA_URL as string; 

export function useProjects(userId: string){
    // console.log(api);

    return useFetchData(`${api}?id=${userId}`);
}

