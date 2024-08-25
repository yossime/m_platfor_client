
import React from 'react';
import { Container } from '../../CommonStyles';
import { ContentInput, ContentSelect } from '../../GenericBoardComponents';
import { IContentTextType } from '@/components/editor/interface/models';
import { DisplayType } from '@/components/editor/interface/paramsType';
import { DisplayList } from './DisplayList';

const displayTypeOptions = [
  { value: DisplayType.DUO, label: "Spotlight Duo" },
  { value: DisplayType.STANDS, label: "Podium stands" },
];

export const ProductContentComponent: React.FC = () => {
  return (
    <Container>
      <ContentSelect
        type={IContentTextType.TEST}
        options={displayTypeOptions}
        label="Display type"
        placeholder="Choose..."
      />
      <ContentInput
        type={IContentTextType.TITLE}
        placeholder="Site Name"
        label="Title"
      />
      <DisplayList />
    </Container>
  );
};