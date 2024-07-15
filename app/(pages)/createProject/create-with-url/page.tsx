"use client"
import { useState } from "react";
import * as Styled from "./page.styled"


interface FormData {
    name: string;
    url: string;
}

const api = process.env.NEXT_PUBLIC_API_SERVER;

const CreateWithUrl = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        url: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { url, name } = formData;
        console.log(formData);

        try {
            const response = await fetch(`${api}/project`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (response.status === 200) {
                // setPage(true);
                // const updatedProjects = [...data.projects, url];
                // data.projects = updatedProjects;
            } else {
                console.log('Error: ' + data.message);
            }
        } catch (error) {
            console.log('Error: ' + (error as Error).message);
        } 
    };



        

    return (
        <Styled.Box>
            <Styled.FormContainer>
                <Styled.Form onSubmit={handleSubmit}>
                    <Styled.Label htmlFor="name">Name:</Styled.Label>
                    <Styled.Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

                    <Styled.Label htmlFor="text">Url:</Styled.Label>
                    <Styled.Input type="text" id="url" name="url" value={formData.url} onChange={handleChange} />

                    <Styled.SubmitButton type="submit">Submit</Styled.SubmitButton>
                </Styled.Form>
            </Styled.FormContainer>
        </Styled.Box>
    )
}

export default CreateWithUrl;