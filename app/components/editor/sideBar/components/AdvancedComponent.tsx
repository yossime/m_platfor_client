import React from 'react';
import { HeaderType } from '../types';
import { HeaderAdvancedComponent } from './boards/header/HeaderAdvanced';
import { ProductAdvancedComponent } from './boards/product/ProductAdvanced';
import { SliderAdvancedComponent } from './boards/slider/SliderAdvanced';
import { ImageAdvancedComponent } from './boards/image/ImageAdvanced';
import { VideoAdvancedComponent } from './boards/video/VideoAdvanced';
import { TestimonialsAdvancedComponent } from './boards/testimonials/TestimonialsAdvanced';
import { SubScriptionAdvancedComponent } from './boards/subScription/SubScriptionAdvanced';
import { ServicesAdvancedComponent } from './boards/services/ServicesAdvanced';
import { GamificationAdvancedComponent } from './boards/gamification/GamificationAdvanced';
import { FormAdvancedComponent } from './boards/form/FormAdvanced';
import { CosialsAdvancedComponent } from './boards/cosials/CosialsAdvanced';
import { ArticleAdvancedComponent } from './boards/article/ArticleAdvanced';

interface AdvancedComponentProps {
  activeSidebarHeader: HeaderType;
}

export const AdvancedComponent: React.FC<AdvancedComponentProps> = ({ activeSidebarHeader }) => {
  switch (activeSidebarHeader) {
    case 'Edit Header':
      return <HeaderAdvancedComponent />;
    case 'Edit Product':
      return <ProductAdvancedComponent />;
    case 'Edit Slider':
      return <SliderAdvancedComponent />;
    case 'Edit Image':
      return <ImageAdvancedComponent />;
    case 'Edit Video':
      return <VideoAdvancedComponent />;
    case 'Edit Testimonials':
      return <TestimonialsAdvancedComponent />;
    case 'Edit ImSubScriptionage':
      return <SubScriptionAdvancedComponent />;
    case 'Edit Services':
      return <ServicesAdvancedComponent />;
    case 'Edit Gamification':
      return <GamificationAdvancedComponent />;
    case 'Edit Form':
      return <FormAdvancedComponent />;
    case 'Edit Cosials':
      return <CosialsAdvancedComponent />;
    case 'Edit Article':
      return <ArticleAdvancedComponent />;
    default:
      return <div>No advanced options available for {activeSidebarHeader}</div>;
  }
};