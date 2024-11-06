import React from "react";
import { SliderContentComponent } from "../boards/slider/SliderContent";
import { HeaderContentComponent } from "../boards/header/HeaderContent";
import { ImageContentComponent } from "../boards/image/ImageContent";
import { VideoContentComponent } from "../boards/video/VideoContent";
import { TestimonialsContentComponent } from "../boards/testimonials/TestimonialsContent";
import { ServicesContentComponent } from "../boards/services/ServicesContent";
import { GamificationContentComponent } from "../boards/gamification/GamificationContent";
import { FormContentComponent } from "../boards/form/FormContent";
import { SocialsContentComponent } from "../boards/socials/SocialsContent";
import { ArticleContentComponent } from "../boards/article/ArticleContent";
import { ProductContentComponent } from "../boards/product/ProductContent";
import { SubscriptionContentComponent } from "../boards/subscription/SubscriptionContent";
import { useSidebarContext } from "@/context/SidebarContext ";
import { ChooseBoardWidgetComponent } from "../chooseBoard/ChooseBoardWidgetComponent";
import ArchitectureComponent from "../WorldSideBar/ArchitectureComponent";
import ModelDetails from "../model/ModelDetails";

export const ContentComponent: React.FC = () => {
  const { activeSidebarHeader } = useSidebarContext();

  switch (activeSidebarHeader) {
    case "Header":
      return <HeaderContentComponent />;
    case "Product":
      return <ProductContentComponent />;
    case "Slider":
      return <SliderContentComponent />;
    case "Image":
      return <ImageContentComponent />;
    case "Video":
      return <VideoContentComponent />;
    case "Testimonials":
      return <TestimonialsContentComponent />;
    case "Subscription":
      return <SubscriptionContentComponent />;
    case "Services":
      return <ServicesContentComponent />;
    case "Gamification":
      return <GamificationContentComponent />;
    case "Form":
      return <FormContentComponent />;
    case "Socials":
      return <SocialsContentComponent />;
    case "Article":
      return <ArticleContentComponent />;
    case "World":
      return <ArchitectureComponent />;
    case "Choose Board Widget":
      return <ChooseBoardWidgetComponent />;
    case "Model":
      return <ModelDetails />;
    default:
      return <div>No content options available for {activeSidebarHeader}</div>;
  }
};
