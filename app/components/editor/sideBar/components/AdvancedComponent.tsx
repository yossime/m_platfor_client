import React from 'react';
import { HeaderType } from '../types';
import { HeaderAdvancedComponent } from './boards/header/HeaderAdvanced';
import { ProductAdvancedComponent } from './boards/product/ProductAdvanced';
import { SliderAdvancedComponent } from './boards/slider/SliderAdvanced';
import { ImageAdvancedComponent } from './boards/image/ImageAdvanced';
import { VideoAdvancedComponent } from './boards/video/VideoAdvanced';
import { TestimonialsAdvancedComponent } from './boards/testimonials/TestimonialsAdvanced';
import { ServicesAdvancedComponent } from './boards/services/ServicesAdvanced';
import { GamificationAdvancedComponent } from './boards/gamification/GamificationAdvanced';
import { FormAdvancedComponent } from './boards/form/FormAdvanced';
import { SocialsAdvancedComponent } from './boards/socials/SocialsAdvanced';
import { ArticleAdvancedComponent } from './boards/article/ArticleAdvanced';
import { SubscriptionAdvancedComponent } from './boards/subscription/SubscriptionAdvanced';

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
    case 'Edit Subscription':
      return <SubscriptionAdvancedComponent />;
    case 'Edit Services':
      return <ServicesAdvancedComponent />;
    case 'Edit Gamification':
      return <GamificationAdvancedComponent />;
    case 'Edit Form':
      return <FormAdvancedComponent />;
    case 'Edit Socials':
      return <SocialsAdvancedComponent />;
    case 'Edit Article':
      return <ArticleAdvancedComponent />;
    default:
      return <div>No advanced options available for {activeSidebarHeader}</div>;
  }
};