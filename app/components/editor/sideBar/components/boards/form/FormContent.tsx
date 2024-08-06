import React, { ChangeEvent, useState } from 'react';
import Input from '@/components/Library/input/Input';
import { InputMode, InputSize } from '@constants/input';
import Button from '@/components/Library/button/Button';
import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import { Container, Divider, SubContainer, SubWrapper } from '../../CommonStyles';
import DataObfuscator from '@/components/Library/general/DataObfuscator';
import Collapsible from '@/components/Library/general/Collapsible';
import { IconName } from '@constants/icon';
import { FontWeight, TextSize } from '@constants/text';
import Text from '@/components/Library/text/Text'
import styled from 'styled-components';
import Popup from '@/components/Library/general/Popup';

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

type FieldType = 'Textual' | 'Phone number' | 'Email' | 'Free text';

interface IField {
  type: FieldType;
  label: string;
  placeholder: string;
}

interface IForm {
  title: string | null;
  subtitle: string | null;
  button: string | null;
  fields: IField[];
}

const getDefaultFieldProps = (type: FieldType): { label: string; placeholder: string } => {
  switch (type) {
    case 'Textual':
      return { label: 'Short Text', placeholder: 'Enter 1-3 words' };
    case 'Phone number':
      return { label: 'Phone', placeholder: '+000-000-0000' };
    case 'Email':
      return { label: 'Email', placeholder: 'Enter your email' };
    case 'Free text':
      return { label: 'Long Text', placeholder: 'Enter your message here' };
  }
};

export const FormContentComponent: React.FC = () => {
  const [form, setForm] = useState<IForm>({
    title: 'Contact Us',
    subtitle: 'Ask us anything you want!',
    button: 'Submit!',
    fields: [{ type: 'Textual', ...getDefaultFieldProps('Textual') }],
  });
  const [openSections, setOpenSections] = useState({ title: true, subtitle: true, button: true });
  const [showPopup, setShowPopup] = useState(false);

  const handleSectionToggle = (section: keyof typeof openSections) => (isOpen: boolean) => {
    setOpenSections(prev => ({ ...prev, [section]: isOpen }));
    if (!isOpen) {
      setForm(prev => ({ ...prev, [section]: null }));
    }
  };

  const handleInputChange = (field: keyof IForm) => (event: ChangeEvent<HTMLInputElement>) => {
    console.log('handle', event.target.value);
    setForm(prev => ({ ...prev, [field]: event.target.value }));
  };

  const updateField = (index: number, updates: Partial<IField>) => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields.map((field, i) => i === index ? { ...field, ...updates } : field)
    }));
  };

  const addNewField = (type: FieldType) => {
    setForm(prev => ({
      ...prev,
      fields: [...prev.fields, { type, ...getDefaultFieldProps(type) }]
    }));
    setShowPopup(false);
  };

  const deleteField = (index: number) => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }));
  };

  return (
    <Container>
      <DataObfuscator
        title='Title'
        isOpen={openSections.title}
        onToggle={handleSectionToggle('title')}
      >
        <Input
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          value={form.title || ''}
          onChange={handleInputChange('title')}
        />
      </DataObfuscator>
      <DataObfuscator
        title='Subtitle'
        isOpen={openSections.subtitle}
        onToggle={handleSectionToggle('subtitle')}
      >
        <Input
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          value={form.subtitle || ''}
          onChange={handleInputChange('subtitle')}
        />
      </DataObfuscator>
      <SubWrapper>
        <Text weight={FontWeight.SEMI_BOLD} size={TextSize.TEXT2}>Fields</Text>
        <SubContainer>
          {form.fields.map((field, index) => (
            <React.Fragment key={index}>
              <Collapsible title={field.label}>
                <FieldWrapper>
                  <Input
                    inputSize={InputSize.SMALL}
                    mode={InputMode.NORMAL}
                    label="Label"
                    value={field.label}
                    onChange={(e) => updateField(index, { label: e.target.value })}
                  />
                  <Input
                    inputSize={InputSize.SMALL}
                    mode={InputMode.NORMAL}
                    label="Placeholder"
                    value={field.placeholder}
                    onChange={(e) => updateField(index, { placeholder: e.target.value })}
                  />
                  <Button
                    size={ButtonSize.SMALL}
                    type={ButtonType.PRIMARY}
                    variant={ButtonVariant.SECONDARY}
                    text="Remove field"
                    icon={IconName.TRASH}
                    onClick={() => deleteField(index)}
                  />
                </FieldWrapper>
              </Collapsible>
              <Divider />
            </React.Fragment>
          ))}
          <Button
            size={ButtonSize.SMALL}
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.SECONDARY}
            text="Add Field"
            icon={IconName.PLUSCIRCLE}
            onClick={() => setShowPopup(true)}
          />
        </SubContainer>
      </SubWrapper>
      <DataObfuscator
        title='Button'
        isOpen={openSections.button}
        onToggle={handleSectionToggle('button')}
      >
        <Input
          inputSize={InputSize.SMALL}
          mode={form.button === '' ? InputMode.ERROR : InputMode.NORMAL}
          value={form.button || ''}
          onChange={handleInputChange('button')}
        />
      </DataObfuscator>
      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <SubContainer>
            {(['Textual', 'Phone number', 'Email', 'Free text'] as const).map((type) => (
              <Button
                key={type}
                size={ButtonSize.SMALL}
                type={ButtonType.PRIMARY}
                variant={ButtonVariant.SECONDARY}
                text={type}
                onClick={() => addNewField(type)}
              />
            ))}
          </SubContainer>
        </Popup>
      )}
    </Container>
  );
};