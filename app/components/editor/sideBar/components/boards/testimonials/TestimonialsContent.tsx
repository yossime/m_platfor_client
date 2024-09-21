import React, { ChangeEvent, useCallback, useState } from 'react';
import Input from '@/components/Library/input/Input';
import { InputMode, InputSize } from '@constants/input';
import Button from '@/components/Library/button/Button';
import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import { Container, Divider, SubContainer, SubWrapper } from '../../CommonStyles';
import Collapsible from '@/components/Library/general/Collapsible';
import DataObfuscator from '@/components/Library/general/DataObfuscator';
import { IconName } from '@constants/icon';
import { FontWeight, TextSize } from '@constants/text';
import Text from '@/components/Library/text/Text'
import StarRating from '@/components/Library/general/StarRating';
import styled from 'styled-components';

const Testimonial = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

interface ITestimonial {
  quote: string;
  author: string | null;
  rank: number | null;
}

export const TestimonialsContentComponent: React.FC = () => {
  const [title, setTitle] = useState<string>();
  const [isOpen, setIsOpen] = useState(true);
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([
    { quote: '', author: null, rank: null },
  ]);


  const handleToggle = useCallback((newIsOpen: boolean) => {
    setIsOpen(newIsOpen);
    if (!newIsOpen) {
      setTitle('');
    }
  }, []);




  const handleInputChange = () => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
  };

  const updateTestimonial = (index: number, field: keyof ITestimonial, value: any) => {
    setTestimonials(prev => prev.map((t, i) =>
      i === index ? { ...t, [field]: value } : t
    ));
  };

  const addTestimonial = () => {
    setTestimonials(prev => [...prev, { quote: '', author: null, rank: null }]);
    console.log('add testimonial', testimonials)
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(prev => prev.filter((_, i) => i !== index));
  };

  const handleObfuscatorToggle = (index: number, field: 'author' | 'rank') => (isOpen: boolean) => {
    updateTestimonial(index, field, isOpen ? '' : null);
  };

  return (
    <Container>
      <DataObfuscator
        title='Title'
        isOpen={isOpen}
        onToggle={handleToggle}
      >
        <Input
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          placeholder="Site Name"
          value={title}
          onChange={handleInputChange()}
        />
      </DataObfuscator>

      <SubWrapper>
        <Text $weight={FontWeight.SEMI_BOLD} size={TextSize.TEXT2}>
          Testimonials
        </Text>

        <SubContainer>
          {testimonials.map((testimonial, index) => (
            <>
              <Collapsible key={index} title={`Happy Customer ${index + 1}`}>
                <Testimonial>
                  <Input
                    inputSize={InputSize.SMALL}
                    mode={InputMode.NORMAL}
                    label="The Quote"
                    placeholder="I had a great experience"
                    value={testimonial.quote}
                    onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                  />
                  <DataObfuscator
                    title='The Author'
                    isOpen={testimonial.author !== null}
                    onToggle={handleObfuscatorToggle(index, 'author')}
                  >
                    <Input
                      inputSize={InputSize.SMALL}
                      mode={InputMode.NORMAL}
                      placeholder="Happy customer"
                      value={testimonial.author || ''}
                      onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                    />
                  </DataObfuscator>
                  <DataObfuscator
                    title='Rank'
                    isOpen={testimonial.rank !== null}
                    onToggle={handleObfuscatorToggle(index, 'rank')}
                  >
                    <StarRating
                      onChange={(rating) => updateTestimonial(index, 'rank', rating)}
                    />
                  </DataObfuscator>
                  <Button
                    size={ButtonSize.SMALL}
                    type={ButtonType.PRIMARY}
                    variant={ButtonVariant.SECONDARY}
                    text="Remove"
                    icon={IconName.TRASH}
                    onClick={() => removeTestimonial(index)}
                  />
                </Testimonial>
              </Collapsible>
              <Divider />
            </>
          ))}
          <Button
            size={ButtonSize.SMALL}
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.SECONDARY}
            text="Add testimonial"
            icon={IconName.PLUSCIRCLE}
            onClick={addTestimonial}
          />
        </SubContainer>
      </SubWrapper>
    </Container>
  );
};