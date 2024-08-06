"use client"

import { useEffect, useState } from "react";
import { useEditor } from "@/context/useEditorContext";
import { IParams } from '@/components/editor/interface/paramsType';
import EditorComponent from "@/components/editor/EditorComponent";
import axios from "@/utils/axios";
import { auth } from "@/services/firebase";
import { User } from "firebase/auth";


interface UserData {
  isSubscriber: boolean;
  credits: number;
}

const API = 'http://localhost:3500';

const Editor: React.FC = () => {
  const { setDataParameters } = useEditor();

  // useEffect(() => {
  //   const dataParameters: IParams = {
  //     architecture: 'Barbiz',
  //     materialParams: {},
  //     maxSlot: 5,
  //     boards: Array(5).fill({ type: null, name: null })
  //   };

  //   setDataParameters(dataParameters);
  // }, [setDataParameters]);

  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //     if (user) {
  //       fetchUserData(user);
  //     } else {
  //       setUserData(null);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  // const fetchUserData = async (user: User) => {
  //   try {
  //     const idToken = await user.getIdToken();
  //     const response = await axios.get(`${API}/user`, {
  //       headers: {
  //         'Authorization': `Bearer ${idToken}`,
  //       },
  //     });
  //     setUserData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // };
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFile(e.target.files[0]);
  //   }
  // };

  // const uploadFile = async () => {
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     // const idToken = await user.getIdToken();
  //     const response = await axios.post(`${API}/upload`, formData, {
  //       // headers: {
  //       //   'Authorization': `Bearer ${idToken}`,
  //       //   'Content-Type': 'multipart/form-data',
  //       // },
  //     });
  //     setMessage(response.data);
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     setMessage('Error uploading file');
  //   }
  // };

  // const getUser = async () => {
  //   const response = await axios.get('http://localhost:3500/user');
  //   console.log('User:', response.data);
  // }


  // useEffect(() => {
  //   getUser();

  // }, []);


  return (

    <EditorComponent/>

    // <div>
    //   <h1>File Upload Client</h1>

    //   <>
    //     <p>Welcome, {user?.displayName}</p>
    //     {userData && (
    //       <div>
    //         <p>Subscriber: {userData.isSubscriber ? 'Yes' : 'No'}</p>
    //         <p>Credits: {userData.credits}</p>
    //       </div>
    //     )}
    //     <input type="file" onChange={handleFileChange} />
    //     <button onClick={uploadFile}>Upload File</button>
    //   </>

    //   {message && <p>{message}</p>}
    // </div>
  );
}

export default Editor;