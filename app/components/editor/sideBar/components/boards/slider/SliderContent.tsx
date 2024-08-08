import React, { useState, useCallback } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import Button from '@/components/Library/button/Button';
import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import styled from 'styled-components';
import { Container } from '../../CommonStyles';
import DraggableImageItem from './DraggableImageItem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


interface FileData {
  id: string;
  name: string;
  content: ArrayBuffer;
}

const ImageList = styled.ul`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 50px;
`;





export const SliderContentComponent: React.FC = () => {
  const [images, setImages] = useState<FileData[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    const newImagesPromises = acceptedFiles.map(async (file) => ({
      id: Date.now().toString(),
      name: file.name,
      content: await file.arrayBuffer()
    }));

    const newImages = await Promise.all(newImagesPromises);
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({ 
    onDrop, 
    noClick: true, 
    noKeyboard: true,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    }
  });

  const handleDelete = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const moveImage = useCallback((dragIndex: number, hoverIndex: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      const [draggedImage] = newImages.splice(dragIndex, 1);
      newImages.splice(hoverIndex, 0, draggedImage);
      return newImages;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>

      <Container {...getRootProps()}>
        <Button
          size={ButtonSize.LARGE}
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.SECONDARY}
          text="Add photos"
          onClick={open}
          fullWidth
        />
        <input {...getInputProps()} />

        <ImageList>
          {images.length === 0 && <p>No images yet. Add some photos to get started!</p>}
          {images.map((image, index) => (
            <DraggableImageItem
              key={image.id}
              image={image}
              index={index}
              moveImage={moveImage}
              handleDelete={handleDelete}
            />
          ))}
        </ImageList>
      </Container>
      </DndProvider>

  );
};

export default SliderContentComponent;






// "use client"

// import { useEffect, useState } from "react";
// import { useEditor } from "@/context/useEditorContext";
// import { IParams } from '@/components/editor/interface/paramsType';
// import EditorComponent from "@/components/editor/EditorComponent";
// import axios from "@/utils/axios";
// import { auth } from "@/services/firebase";
// import { User } from "firebase/auth";


// interface UserData {
//   isSubscriber: boolean;
//   credits: number;
// }

// const API = 'https://server-cloud-run-service-kruirvrv6a-uc.a.run.app';

// const Editor: React.FC = () => {
//   const { setDataParameters } = useEditor();

//   // useEffect(() => {
//   //   const dataParameters: IParams = {
//   //     architecture: 'Barbiz',
//   //     materialParams: {},
//   //     maxSlot: 5,
//   //     boards: Array(5).fill({ type: null, name: null })
//   //   };

//   //   setDataParameters(dataParameters);
//   // }, [setDataParameters]);

//   const [user, setUser] = useState<User | null>(null);
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState<string>('');

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//       if (user) {
//         fetchUserData(user);
//       } else {
//         setUserData(null);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const fetchUserData = async (user: User) => {
//     try {
//       const idToken = await user.getIdToken();
//       const response = await axios.get(${API}/user, {
//         headers: {
//           'Authorization': Bearer ${idToken},
//         },
//       });
//       setUserData(response.data);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const uploadFile = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post(${API}/upload, formData, {
//       });
//       setMessage(response.data);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setMessage('Error uploading file');
//     }
//   };

//   const getUser = async () => {
//     const response = await axios.get('https://server-cloud-run-service-kruirvrv6a-uc.a.run.app/user');
//     console.log('User:', response.data);
//   }


//   useEffect(() => {
//     getUser();

//   }, []);


//   return (

//     // <EditorComponent/>

//     <div>
//       <h1>File Upload Client</h1>

//       <>
//         <p>Welcome, {user?.displayName}</p>
//         {userData && (
//           <div>
//             <p>Subscriber: {userData.isSubscriber ? 'Yes' : 'No'}</p>
//             <p>Credits: {userData.credits}</p>
//           </div>
//         )}
//         <input type="file" onChange={handleFileChange} />
//         <button onClick={uploadFile}>Upload File</button>
//       </>

//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default Editor;
