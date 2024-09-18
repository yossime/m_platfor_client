
import React from 'react';
import { Container } from '../../CommonStyles';
import { ContentInput, ContentSelect } from '../../GenericBoardComponents';
import { DisplayList } from './DisplayList';
import { ContentDataType, DisplayType } from '@/components/editor/types/index';

const displayTypeOptions = [
  { value: DisplayType.DUO, label: "Spotlight Duo" },
  { value: DisplayType.STANDS, label: "Podium stands" },
];

export const ProductContentComponent: React.FC = () => {
  return (
    <Container>
      <ContentSelect
        type={ContentDataType.FRAME}
        options={displayTypeOptions}
        label="Display type"
        placeholder="Choose..."
      />
      <ContentInput
        type={ContentDataType.TITLE}
        placeholder="Site Name"
        label="Title"
      />
      <DisplayList />
    </Container>
  );
};