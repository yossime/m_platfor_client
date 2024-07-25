import React from 'react';
import { HeaderType } from '../types';
import { SliderContentComponent } from './subComponents/slider/SliderContent';
import { ProductContentComponent } from './subComponents/product/ProductContent';
import { HeaderContentComponent } from './subComponents/header/HeaderContent';
import { ImageContentComponent } from './subComponents/image/ImageContent';

interface ContentComponentProps {
  header: HeaderType;
}

export const ContentComponent: React.FC<ContentComponentProps> = ({ header }) => {
  switch (header) {
    case 'Edit Header':
      return <HeaderContentComponent />;
    case 'Edit Product':
      return <ProductContentComponent/>;
    case 'Edit Slider':
      return <SliderContentComponent/>;
      case 'Edit Image':
        return <ImageContentComponent />;  
    default:
      return <div>No content options available for {header}</div>;
  }
};