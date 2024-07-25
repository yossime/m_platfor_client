import React from 'react';
import { HeaderType } from '../types';
import { HeaderAdvancedComponent } from './subComponents/header/HeaderAdvanced';
import { ProductAdvancedComponent } from './subComponents/product/ProductAdvanced';
import { SliderAdvancedComponent } from './subComponents/slider/SliderAdvanced';
import { ImageAdvancedComponent } from './subComponents/image/ImageAdvanced';

interface AdvancedComponentProps {
  header: HeaderType;
}

export const AdvancedComponent: React.FC<AdvancedComponentProps> = ({ header }) => {
  switch (header) {
    case 'Edit Header':
      return <HeaderAdvancedComponent/>
    case 'Edit Product':
      return <ProductAdvancedComponent/>;
    case 'Edit Slider':
      return <SliderAdvancedComponent/>;
    case 'Edit Image':
      return <ImageAdvancedComponent/>;
    default:
      return <div>No advanced options available for {header}</div>;
  }
};