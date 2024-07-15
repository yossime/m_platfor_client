"use client"
import { useRouter } from 'next/navigation';

const CreateProject = () => {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('createProject/create-via-questionnaire');
    };

    return (
        <>
            <button onClick={handleButtonClick}>create project</button>
        </>
    );
};

export default CreateProject;