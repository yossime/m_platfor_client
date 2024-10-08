import React from 'react';
import { SliderContentComponent } from '../boards/slider/SliderContent';
import { HeaderContentComponent } from '../boards/header/HeaderContent';
import { ImageContentComponent } from '../boards/image/ImageContent';
import { VideoContentComponent } from '../boards/video/VideoContent';
import { TestimonialsContentComponent } from '../boards/testimonials/TestimonialsContent';
import { ServicesContentComponent } from '../boards/services/ServicesContent';
import { GamificationContentComponent } from '../boards/gamification/GamificationContent';
import { FormContentComponent } from '../boards/form/FormContent';
import { SocialsContentComponent } from '../boards/socials/SocialsContent';
import { ArticleContentComponent } from '../boards/article/ArticleContent';
import { ProductContentComponent } from '../boards/product/ProductContent';
import { SubscriptionContentComponent } from '../boards/subscription/SubscriptionContent';
import { useSidebarContext } from '@/context/SidebarContext ';



export const ContentComponent: React.FC = () => {
  const {activeSidebarHeader} = useSidebarContext()

  switch (activeSidebarHeader) {
    case 'Header':
      return <HeaderContentComponent />;
    case 'Product':
      return <ProductContentComponent />;
    case 'Slider':
      return <SliderContentComponent />;
    case 'Image':
      return <ImageContentComponent />;
    case 'Video':
      return <VideoContentComponent />;
    case 'Testimonials':
      return <TestimonialsContentComponent />;
    case 'Subscription':
      return <SubscriptionContentComponent />;
    case 'Services':
      return <ServicesContentComponent />;
    case 'Gamification':
      return <GamificationContentComponent />;
    case 'Form':
      return <FormContentComponent />;
    case 'Socials':
      return <SocialsContentComponent />;
    case 'Article':
      return <ArticleContentComponent />;
    default:
      return <div>No content options available for {activeSidebarHeader}</div>;
  }
};