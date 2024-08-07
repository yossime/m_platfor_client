import React, { ChangeEvent, useEffect, useState } from 'react';
import Input from '@/components/Library/input/Input';
import { InputMode, InputSize } from '@constants/input';
import { Container, DeleteIcon, Divider, FileDisplay, FileName } from '../../CommonStyles';
import DataObfuscator from '@/components/Library/general/DataObfuscator';
import DragAndDrop from '@/components/Library/general/DragAndDrop';






interface IMaster {
  title: string;
  subtitle: string;
  button: string;
  image?: File | string | undefined;
}


// Assuming you have a function to fetch data from the database
// async function fetchDataFromDatabase(): Promise<IMaster | null> {
//   // Implement your database fetching logic here
//   // Return null if no data is found
// }

// Assuming you have a function to update data in the database
async function updateDataInDatabase(data: IMaster): Promise<void> {
  // Implement your database update logic here
}

const defaultMaster: IMaster = {
  title: 'Subscribe to our newsletter!',
  subtitle: 'Join us to hear about upcoming deals and promotions!',
  button: 'Submit!',
};


export const HeaderContentComponent: React.FC = () => {
  const [master, setMaster] = useState<IMaster>(defaultMaster);
  const [openSections, setOpenSections] = useState({
    title: true,
    subtitle: true,
    button: true,
  });



  const handleInputChange = (field: keyof IMaster) => async (event: ChangeEvent<HTMLInputElement>) => {
    const newMaster = { ...master, [field]: event.target.value };
    setMaster(newMaster);
    // await updateDataInDatabase(newMaster);
  };

  const handleSectionToggle = (section: keyof typeof openSections) => (isOpen: boolean) => {
    setOpenSections(prev => ({ ...prev, [section]: isOpen }));
    if (!isOpen) {
      setOpenSections(prev => ({ ...prev, [section]: '' }));
    }
  };

  const handleImageUpload = async (file: File) => {
    const newMaster = { ...master, image: file };
    setMaster(newMaster);
    // await updateDataInDatabase(newMaster);
  };

  const handleDeleteFile = async () => {
    const newMaster = { ...master, image: undefined };
    setMaster(newMaster);
    // await updateDataInDatabase(newMaster);
  };


  return (
    <Container>
      <DataObfuscator
        title='Title'
        isOpen={openSections.title}
        onToggle={handleSectionToggle('title')}
      >
        <Input
          placeholder='Enter title'
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          value={master.title}
          onChange={handleInputChange('title')}
        />
      </DataObfuscator>
      <DataObfuscator
        title='Subtitle'
        isOpen={openSections.subtitle}
        onToggle={handleSectionToggle('subtitle')}
      >
        <Input
          placeholder='Enter subtitle'
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          value={master.subtitle}
          onChange={handleInputChange('subtitle')}
        />
      </DataObfuscator>
      <Divider />
      {master.image ? (
        <FileDisplay>
          <FileName>{typeof master.image === 'string' ? master.image : master.image.name}</FileName>
          <DeleteIcon size={20} onClick={handleDeleteFile} />
        </FileDisplay>
      ) : (
        <DragAndDrop
          type='image'
          onFileAdded={handleImageUpload}
          buttonOnly={true}
        />
      //   <DragAndDrop
      //   onFileProcessed={handleImageUpload}
      //   type="image"
      //   cropWidth={400}
      //   cropHeight={300}
      // />
      )}
      <Divider />
      <DataObfuscator
        title='Button'
        isOpen={openSections.button}
        onToggle={handleSectionToggle('button')}
      >
        <Input
          placeholder='Enter button text'
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          value={master.button}
          onChange={handleInputChange('button')}
        />
      </DataObfuscator>
    </Container>
  );
};



