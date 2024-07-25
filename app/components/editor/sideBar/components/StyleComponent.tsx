import React from 'react';
import { HeaderType } from '../types';
import { SliderStyleComponent } from './subComponents/slider/SliderStyle';
import { ProductStyleComponent } from './subComponents/product/ProductStyle';
import { HeaderStyleComponent } from './subComponents/header/HeaderStyle';
import { ImageStyleComponent } from './subComponents/image/ImageStyle';

interface StyleComponentProps {
  header: HeaderType;
}

export const StyleComponent: React.FC<StyleComponentProps> = ({ header }) => {
  switch (header) {
    case 'Edit Header':
      return <HeaderStyleComponent />;
    case 'Edit Product':
      return <ProductStyleComponent />;
    case 'Edit Slider':
      return <SliderStyleComponent />;
    case 'Edit Image':
      return <ImageStyleComponent />;
    default:
      return <div>No style options available for {header}</div>;
  }
};