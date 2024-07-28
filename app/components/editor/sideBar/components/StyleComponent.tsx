import React from 'react';
import { HeaderType } from '../types';
import { SliderStyleComponent } from './boards/slider/SliderStyle';
import { ProductStyleComponent } from './boards/product/ProductStyle';
import { HeaderStyleComponent } from './boards/header/HeaderStyle';
import { ImageStyleComponent } from './boards/image/ImageStyle';
import { VideoStyleComponent } from './boards/video/VideoStyle';
import { TestimonialsStyleComponent } from './boards/testimonials/TestimonialsStyle';
import { SubScriptionStyleComponent } from './boards/subScription/SubScriptionStyle';
import { ServicesStyleComponent } from './boards/services/ServicesStyle';
import { GamificationStyleComponent } from './boards/gamification/GamificationStyle';
import { FormStyleComponent } from './boards/form/FormStyle';
import { CosialsStyleComponent } from './boards/cosials/CosialsStyle';
import { ArticleStyleComponent } from './boards/article/ArticleStyle';

interface StyleComponentProps {
  activeSidebarHeader: HeaderType;
}

export const StyleComponent: React.FC<StyleComponentProps> = ({ activeSidebarHeader }) => {
  switch (activeSidebarHeader) {
    case 'Edit Header':
      return <HeaderStyleComponent />;
    case 'Edit Product':
      return <ProductStyleComponent />;
    case 'Edit Slider':
      return <SliderStyleComponent />;
    case 'Edit Image':
      return <ImageStyleComponent />;
    case 'Edit Video':
      return <VideoStyleComponent />;
    case 'Edit Testimonials':
      return <TestimonialsStyleComponent />;
    case 'Edit ImSubScriptionage':
      return <SubScriptionStyleComponent />;
    case 'Edit Services':
      return <ServicesStyleComponent />;
    case 'Edit Gamification':
      return <GamificationStyleComponent />;
    case 'Edit Form':
      return <FormStyleComponent />;
    case 'Edit Cosials':
      return <CosialsStyleComponent />;
    case 'Edit Article':
      return <ArticleStyleComponent />;
    default:
      return <div>No style options available for {activeSidebarHeader}</div>;
  }
};