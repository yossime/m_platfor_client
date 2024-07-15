"use client"
import { useRouter } from 'next/navigation';
import ProjectList from "@/components/userPage/ProjectList";


const UserPage = () => {

    const router = useRouter();

    const handleButtonClick = () => {
        router.push('createProject/create-via-questionnaire');
    };

    return (
        <>
         <ProjectList/>
         {/* <button onClick={handleButtonClick}>create project</button> */}
         </>
       
    );
};

export default UserPage;