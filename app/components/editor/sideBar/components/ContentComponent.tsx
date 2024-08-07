import React from 'react';
import { HeaderType } from '../types';
import { SliderContentComponent } from './boards/slider/SliderContent';
import { ProductContentComponent } from './boards/product/ProductContent';
import { HeaderContentComponent } from './boards/header/HeaderContent';
import { ImageContentComponent } from './boards/image/ImageContent';
import { VideoContentComponent } from './boards/video/VideoContent';
import { TestimonialsContentComponent } from './boards/testimonials/TestimonialsContent';
import { ServicesContentComponent } from './boards/services/ServicesContent';
import { GamificationContentComponent } from './boards/gamification/GamificationContent';
import { FormContentComponent } from './boards/form/FormContent';
import { SocialsContentComponent } from './boards/socials/SocialsContent';
import { ArticleContentComponent } from './boards/article/ArticleContent';
import { SubscriptionContentComponent } from './boards/subscription/SubscriptionContent';

interface ContentComponentProps {
  activeSidebarHeader: HeaderType;
}

export const ContentComponent: React.FC<ContentComponentProps> = ({ activeSidebarHeader }) => {
  switch (activeSidebarHeader) {
    case 'Edit Header':
      return <HeaderContentComponent />;
    case 'Edit Product':
      return <ProductContentComponent />;
    case 'Edit Slider':
      return <SliderContentComponent />;
    case 'Edit Image':
      return <ImageContentComponent />;
    case 'Edit Video':
      return <VideoContentComponent />;
    case 'Edit Testimonials':
      return <TestimonialsContentComponent />;
    case 'Edit Subscription':
      return <SubscriptionContentComponent />;
    case 'Edit Services':
      return <ServicesContentComponent />;
    case 'Edit Gamification':
      return <GamificationContentComponent />;
    case 'Edit Form':
      return <FormContentComponent />;
    case 'Edit Socials':
      return <SocialsContentComponent />;
    case 'Edit Article':
      return <ArticleContentComponent />;
    default:
      return <div>No content options available for {activeSidebarHeader}</div>;
  }
};